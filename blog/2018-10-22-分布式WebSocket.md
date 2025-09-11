---
slug: websocket-distributed
title: 分布式WebSocket
date: 2018-10-22
authors: lidaqian
tags: [Java, WebSocket]
keywords: [Java, WebSocket, Distributed]
---

<!-- truncate -->

## 前言

扫码点餐同一桌多人点餐，服务端需要将其中一人点的菜品实时推送到其他人的页面上，这就需要用到 WebSocket 的广播功能。

这里利用了 Spring Boot + WebSocket + Redis 实现了一个简单的分布式 WebSocket 广播功能。

## 正文

需要发送 WebSocket 消息的服务端集群节点，均需要订阅 Redis 的某个频道（channel），当有消息发布到该频道时，所有订阅该频道的节点均会收到该消息，然后再通过 WebSocket 将消息推送到对应的客户端。

### Redis 订阅发布配置

```java
@Configuration
public class RedisObserverConfig {

    public static final String TOPIC_ORDER_FOOD = "websocket:order_food";

    @Autowired
    private JedisConnectionFactory jedisConnectionFactory;

    @Bean
    RedisMessageListenerContainer redisContainer() {
        final RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(jedisConnectionFactory);
        container.addMessageListener(messageListener(), orderFoodTopic());
        container.setTaskExecutor(Executors.newFixedThreadPool(4));
        return container;
    }

    @Bean
    MessageListenerAdapter messageListener() {
        return new MessageListenerAdapter(orderFoodListener());
    }

    @Bean
    ChannelTopic orderFoodTopic() {
        return new ChannelTopic(TOPIC_ORDER_FOOD);
    }

    @Bean
    OrderDishesListener orderFoodListener() {
        return new OrderDishesListener();
    }

}
```

```xml
<bean id="jedisConnectionFactory"
		class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory"
		destroy-method="destroy">
		<property name="hostName" value="${redis.host}" />
		<property name="port" value="${redis.port}" />
		<property name="timeout" value="${redis.timeout}" />
		<property name="database" value="${redis.database}" />
		<property name="password" value="${redis.password}" />
		<property name="usePool" value="true" />
		<property name="poolConfig" ref="jedisPoolConfig" />
	</bean>
```

### 发送Redis消息

```java
@Service
public class OrderFoodWebSocketService {

	@Autowired
	private RedisTemplate redisTemplate;

	public void sendMessage() {
		redisTemplate.convertAndSend(RedisObserverConfig.TOPIC_ORDER_FOOD, "hello");
	}
}
```

### 接受Redis消息

```java
public class OrderDishesListener implements MessageListener {

    @Autowired
    private RedisSerializer<Object> jsonRedisSerializer;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        Object object = jsonRedisSerializer.deserialize(message.getBody());
        System.out.println("orderDishesListener message body = " + JSON.toJSONString(object));
    }
}
```

### 注意点

nginx 支持 WebSocket，需要在 nginx 配置文件中添加以下配置：

```shell
location /wsapp/ {
    proxy_pass http://wsbackend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
}
```

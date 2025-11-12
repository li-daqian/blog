export const projects: Project[] = [
  {
    title: '李大骞的小站',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://lidaqian.me',
    source: 'https://github.com/li-daqian/blog',
    tags: ['opensource', 'personal'],
    type: 'web',
  },
  {
    title: 'Upload to OSS',
    description: '一个简单的 VS Code 插件，将图片上传到 Cloudflare R2 并自动复制链接到剪贴板。',
    preview: 'https://img.lidaqian.me/blog/482d06d44a2240889c67b386c9855670.png',
    website: 'https://marketplace.visualstudio.com/items?itemName=li-daqian.upload-to-oss',
    source: 'https://github.com/li-daqian/vsc-extension-upload-to-oss',
    tags: ['opensource', 'personal'],
    type: 'personal',
  },
  {
    title: '配置中心',
    description: '零第三方依赖的简易配置中心',
    website: 'https://github.com/li-daqian/aq-config',
    source: 'https://github.com/li-daqian/aq-config',
    tags: ['opensource', 'personal'],
    type: 'toy',
  },
  {
    title: 'Advent of Code',
    description: '个人 Advent of Code 题解仓库',
    website: 'https://adventofcode.com/',
    source: 'https://github.com/li-daqian/aoc',
    tags: ['opensource', 'personal'],
    type: 'algorithm',
  },
  {
    title: 'LeetCode',
    description: '个人 LeetCode 题解仓库',
    website: 'https://leetcode.com',
    source: 'https://github.com/li-daqian/leetCode',
    tags: ['opensource', 'personal'],
    type: 'algorithm',
  },
  {
    title: '分布式统计和过滤的链路追踪',
    description: '首届云原生编程挑战赛1： 实现一个分布式统计和过滤的链路追踪',
    website: 'https://tianchi.aliyun.com/competition/entrance/231790/introduction?spm=5176.12281915.0.0.4f347831wlWtrR',
    source: 'https://github.com/li-daqian/chain',
    tags: ['opensource', 'personal'],
    type: 'algorithm',
  },
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other' | 'algorithm'

export const projectTypeMap = {
  web: '🖥️ 网站',
  app: '💫 应用',
  commerce: '商业项目',
  personal: '👨‍💻 个人',
  toy: '🔫 玩具',
  algorithm: '🤖 算法',
  other: '🗃️ 其他',
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)

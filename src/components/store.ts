import { create } from 'zustand'

export type task = {
  id: number
  attributes: {
    createdAt: string
    description: string
    publishedAt: string
    status: string
    isFavorite: boolean
    title: string
    updatedAt: string
  }
}
export type attributes = {
  createdAt: string
  description: string
  publishedAt: string
  status: string
  isFavorite: boolean
  title: string
  updatedAt: string
}

interface taskListStore {
  tasksList: task[] | []
  task: task
  filter: string
  page: number
  turnPage: () => void

  // getTasksFromServer: (url: string) => void
  getTasks: (tasks: task[]) => void
  addNewTask: (newTask: any) => void
  changeTaskStatus: (taskId: number, taskStatus: string) => void
  setTasksList: (newTasksList: task[]) => void
  setFilter: (filter: string) => void
}

export interface TodoProps {
  el: {
    id: number
    attributes: {
      createdAt: string
      description: string
      publishedAt: string
      status: string
      isFavorite: boolean
      title: string
      updatedAt: string
    }
  }
}

export const useTaskListStore = create<taskListStore>((set) => ({
  task: {
    id: 0,
    attributes: {
      createdAt: '',
      description: '',
      publishedAt: '',
      status: 'active',
      isFavorite: false,
      title: '',
      updatedAt: '',
    },
  },

  tasksList: [],

  filter: '',
  page: 1,
  turnPage: () => set((state) => ({ page: state.page + 1 })),

  getTasks: (tasks: task[]) =>
    set((state: any) => ({
      tasksList: [...state.tasksList, ...tasks],
    })),

  setTasksList: (newTasksList) => set((state) => ({ tasksList: newTasksList })),
  changeTaskStatus: (taskId, taskStatus) =>
    set((state: any) => {
      const found = state.tasksList.find((el: task) => el.id === taskId)
      found.attributes.status = taskStatus
      return state.tasksList
    }),
  setFilter: (filter: string) => set((state: any) => ({ filter: filter })),

  addNewTask: (newTask) =>
    set((state) => ({ tasksList: [...state.tasksList, ...newTask] })),
}))

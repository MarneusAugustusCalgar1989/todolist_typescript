import { create } from 'zustand';

export type task = {
  id: number;
  attributes: {
    createdAt: string;
    description: string;
    publishedAt: string;
    status: string;
    isFavorite: boolean;
    title: string;
    updatedAt: string;
  };
};
export type attributes = {
  createdAt: string;
  description: string;
  publishedAt: string;
  status: string;
  isFavorite: boolean;
  title: string;
  updatedAt: string;
};

interface taskListStore {
  tasksList: task[] | [];
  task: task;
  filter: string;

  getTasksFromServer: (url: string) => void;
  addNewTask: (newTask: any) => void;
  changeTaskStatus: (taskId: number, taskStatus: string) => void;
  setTasksList: (newTasksList: task[]) => void;
  setFilter: (filter: string) => void;
}

export interface TodoProps {
  el: {
    id: number;
    attributes: {
      createdAt: string;
      description: string;
      publishedAt: string;
      status: string;
      isFavorite: boolean;
      title: string;
      updatedAt: string;
    };
  };
}

export const useTaskListStore = create<taskListStore>(set => ({
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

  getTasksFromServer: async (url: string) => {
    if (localStorage.getItem('favoriteList')) {
      const favoriteDataJson: any = localStorage.getItem('favoriteList');
      const favoriteData = JSON.parse(favoriteDataJson);
      set((state: any) => {
        return (state.tasksList = favoriteData.sort(
          (a: task, b: task) => b.id - a.id
        ));
      });
    }
    try {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        set((state: any) => {
          return (state.tasksList = json.data.sort(
            (a: task, b: task) => b.id - a.id
          ));
        });
      } else {
        set(state => ({ tasksList: [] }));
      }
    } catch (error) {
      console.error('Ошибка при загрузке ', error);
    }
  },

  setTasksList: newTasksList => set(state => ({ tasksList: newTasksList })),
  changeTaskStatus: (taskId, taskStatus) =>
    set((state: any) => {
      const found = state.tasksList.find((el: task) => el.id === taskId);
      found.attributes.status = taskStatus;
      return state.tasksList;
    }),
  setFilter: (filter: string) => set((state: any) => ({ filter: filter })),

  addNewTask: newTask =>
    set(state => ({ tasksList: [...state.tasksList, ...newTask] })),
}));

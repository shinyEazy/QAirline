import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelObjectProps {
  id: number;
  name: string;
  base_url: string;
  type: string;
}

interface ModelProviderObjectProps {
  id: number;
  name: string;
  icon: string;
  description: string;
  models: Array<ModelObjectProps>;
  is_added: boolean;
}

interface adminSettingState {
  modelProviderList: Array<ModelProviderObjectProps>;
  modelList: Array<ModelObjectProps>;
  verified: boolean;
}

const initialState: adminSettingState = {
  modelProviderList: [
    {
      id: 0,
      name: "OpenAI",
      icon: "https://demo.ragflow.io/static/openai.6242ead4.svg",
      description: "LLM, TEXT EMBEDDING, SPEECH2TEXT, MODERATION",
      models: [],
      is_added: false,
    },
    {
      id: 0,
      name: "Moonshoot",
      icon: "https://demo.ragflow.io/static/moonshot.3e35964c.svg",
      description: "LLM,TEXT EMBEDDING",
      models: [],
      is_added: false,
    },
    {
      id: 0,
      name: "Tongyi-Qianwen",
      icon: "https://demo.ragflow.io/static/tongyi.8c1b0f0d.svg",
      description: "LLM, TEXT EMBEDDING, SPEECH2TEXT, MODERATION",
      models: [],
      is_added: false,
    },
  ],
  modelList: [],
  verified: false,
};

const adminSettingSlice = createSlice({
  name: "adminSetting",
  initialState,
  reducers: {
    updateModelProviderList: (
      state,
      action: PayloadAction<Array<ModelProviderObjectProps>>
    ) => {
      state.modelProviderList = state.modelProviderList.map((modelProvider) => {
        const match = action.payload.find(
          (item) => item.name === modelProvider.name
        );
        if (match) {
          return {
            ...modelProvider,
            is_added: true,
            models: match.models,
            id: match.id,
          };
        }
        return modelProvider;
      });
      state.modelList = state.modelProviderList.reduce(
        (acc: any, modelProvider) => {
          return acc.concat(modelProvider.models);
        },
        []
      );
    },
    addModel: (
      state,
      action: PayloadAction<{ modelProviderId: number; data: ModelObjectProps }>
    ) => {
      state.modelProviderList = state.modelProviderList.map((modelProvider) => {
        const subModels = modelProvider.models;
        if (modelProvider.id === action.payload.modelProviderId) {
          subModels.push(action.payload.data);
        }
        return {
          ...modelProvider,
          models: subModels,
        };
      });
      state.modelList = state.modelProviderList.reduce(
        (acc: any, modelProvider) => {
          return acc.concat(modelProvider.models);
        },
        []
      );
    },
    removeModel: (
      state,
      action: PayloadAction<{ modelProviderId: number; modelId: number }>
    ) => {
      state.modelProviderList = state.modelProviderList.map((modelProvider) => {
        let subModels = modelProvider.models;
        if (modelProvider.id === action.payload.modelProviderId) {
          subModels = subModels.filter(
            (subModel) => subModel.id !== action.payload.modelId
          );
        }
        return {
          ...modelProvider,
          models: subModels,
        };
      });
      state.modelList = state.modelProviderList.reduce(
        (acc: any, modelProvider) => {
          return acc.concat(modelProvider.models);
        },
        []
      );
    },
    removeModelProvider: (state, action: PayloadAction<number>) => {
      state.modelProviderList = state.modelProviderList.map((modelProvider) => {
        return {
          ...modelProvider,
          is_added:
            modelProvider.id === action.payload
              ? false
              : modelProvider.is_added,
        };
      });
      state.modelList = state.modelProviderList.reduce(
        (acc: any, modelProvider) => {
          return acc.concat(modelProvider.models);
        },
        []
      );
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    },
  },
});

export const {
  updateModelProviderList,
  addModel,
  removeModel,
  removeModelProvider,
  setVerified,
} = adminSettingSlice.actions;

export default adminSettingSlice.reducer;

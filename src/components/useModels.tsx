import { lazy, useState } from 'react';

const importModel = (model: string) =>
  lazy(() =>
    import(`../models/${model}.tsx`)
    .catch(() => import(`../models/NotFound`))
    // .catch(e => console.log(e))
  );

export function DynamicModel({model}: {model: string}) {
  const Model = importModel(model);
  return <Model />
}

export const useModels = (): [(model:string) => void, Record<string, JSX.Element> ] => {
  const [models, setModels] = useState<Record<string, JSX.Element>>({});

  const addModel = (model:string) => {
    if (models && models[model]) return;

    const Model = importModel(model) as any;
    setModels(m => ({...m, [model]: Model}))
  };

  return [addModel, models];
}
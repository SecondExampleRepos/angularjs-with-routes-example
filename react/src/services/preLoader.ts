// react/src/services/preLoader.ts

type PreLoaderCallback = () => void;

const preLoader = (src: string, onLoad: PreLoaderCallback, onError: PreLoaderCallback) => {
  const img = new Image();
  img.onload = () => {
    onLoad();
  };
  img.onerror = () => {
    onError();
  };
  img.src = src;
};

export default preLoader;
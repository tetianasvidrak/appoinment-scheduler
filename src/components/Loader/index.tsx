import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { LoaderProps } from "./index.model";

export const Loader = ({ imageSrc }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <DotLottieReact src={`/assets/${imageSrc}.json`} loop autoplay />
    </div>
  );
};

import { Heading, VStack } from '@chakra-ui/react';

interface IPageLoaderProps {
  loadingText?: string;
  vh?: string;
}
function PageLoader({ loadingText = 'Loading...', vh = 'calc(100vh - 98px)' }: IPageLoaderProps) {
  return (
    <VStack h={vh} justifyContent={'center'} alignItems={'center'}>
      {/* <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        size="sm"
      /> */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 100"
      >
        <circle cx="84" cy="50" r="10" fill="#002f87">
          <animate
            attributeName="r"
            begin="0s"
            calcMode="spline"
            dur="0.25s"
            keySplines="0 0.5 0.5 1"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="10;0"
          />
          <animate
            attributeName="fill"
            begin="0s"
            calcMode="discrete"
            dur="1s"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="#002f87;#80bc00;#54c0e8;#001df9;#002f87"
          />
        </circle>
        <circle cx="16" cy="50" r="10" fill="#002f87">
          <animate
            attributeName="r"
            begin="0s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="0;0;10;10;10"
          />
          <animate
            attributeName="cx"
            begin="0s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="16;16;16;50;84"
          />
        </circle>
        <circle cx="50" cy="50" r="10" fill="#001df9">
          <animate
            attributeName="r"
            begin="-0.25s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="0;0;10;10;10"
          />
          <animate
            attributeName="cx"
            begin="-0.25s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="16;16;16;50;84"
          />
        </circle>
        <circle cx="84" cy="50" r="10" fill="#54c0e8">
          <animate
            attributeName="r"
            begin="-0.5s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="0;0;10;10;10"
          />
          <animate
            attributeName="cx"
            begin="-0.5s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="16;16;16;50;84"
          />
        </circle>
        <circle cx="16" cy="50" r="10" fill="#80bc00">
          <animate
            attributeName="r"
            begin="-0.75s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="0;0;10;10;10"
          />
          <animate
            attributeName="cx"
            begin="-0.75s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            keyTimes="0;0.25;0.5;0.75;1"
            repeatCount="indefinite"
            values="16;16;16;50;84"
          />
        </circle>
      </svg>

      <Heading fontSize={'lg'}>{loadingText}</Heading>
    </VStack>
  );
}

export default PageLoader;

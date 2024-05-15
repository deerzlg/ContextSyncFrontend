import '@umijs/max/typings';

declare global {
  interface Window {
    extensions: string[] | undefined;
    config: {
      maxNumberOfWebWorkers: number;
      showCPUFallbackMessage: boolean;
      showLoadingIndicator: boolean;
      defaultDataSourceName: string;
      dataSources: {
        sourceName: string;
        configuration: {
          name: string;
          wadoUriRoot: string;
          qidoRoot: string;
          wadoRoot: string;
          qidoSupportsIncludeField: boolean;
          imageRendering: string;
          thumbnailRendering: string;
          enableStudyLazyLoad: boolean;
          supportsFuzzyMatching: boolean;
          supportsWildcard: boolean;
          staticWado: boolean;
          singlepart: string;
          bulkDataURI: {
            enabled: boolean;
            relativeResolution: string;
          };
          omitQuotationForMultipartRequest: boolean;
        };
      };
    };
  }
}

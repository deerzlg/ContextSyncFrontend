const config = {
  extensions: [],
  maxNumberOfWebWorkers: 3,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  defaultDataSourceName: 'dicomweb',
  dataSources: {
    sourceName: 'dicomweb',
    configuration: {
      name: 'lihao-dev',
      wadoUriRoot: 'http://10.0.1.151/apis/pacs/dicom-web',
      qidoRoot: 'http://10.0.1.151/apis/pacs/dicom-web',
      wadoRoot: 'http://10.0.1.151/apis/pacs/dicom-web',
      qidoSupportsIncludeField: false,
      imageRendering: 'wadors',
      thumbnailRendering: 'wadors',
      enableStudyLazyLoad: true,
      supportsFuzzyMatching: false,
      supportsWildcard: true,
      staticWado: true,
      singlepart: 'bulkdata,video',
      // whether the data source should use retrieveBulkData to grab metadata,
      // and in case of relative path, what would it be relative to, options
      // are in the series level or study level (some servers like series some study)
      bulkDataURI: {
        enabled: true,
        relativeResolution: 'studies',
      },
      omitQuotationForMultipartRequest: true,
    },
  },
};

export default config;

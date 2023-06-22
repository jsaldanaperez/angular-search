module.exports = {
    shared: (libraryName, defaultConfig) => {
        if (libraryName === '@app/shared/search') {
          return {
            ...defaultConfig,
            strictVersion: false,
            singleton: true
        };
        }

        return {
            ...defaultConfig,
            strictVersion: false,
        };
    },
};

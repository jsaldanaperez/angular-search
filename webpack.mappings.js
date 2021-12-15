libs = [
    '@angular-search/shared/search'
];

framework = {
  '@angular/core': {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^13.0.0',
  },
  '@angular/common': {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^13.0.0',
  },
  '@angular/common/http': {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^13.0.0',
  },
  '@angular/router': {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^13.0.0',
  },
  '@angular/forms': {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^13.0.0',
  }
}

module.exports = {
    libs: libs,
    framework: framework
}
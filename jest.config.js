module.exports = {
  moduleFileExtensions: [
      'js', 'ts', 'json', 'tsx', 'jsx'
  ],
  transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.tsx?$': 'ts-jest'
  }
}
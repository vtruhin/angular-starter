const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { runGeneratorInApp } = require('../../testHelper')
require('chai').should()

const p = file => `app/components/${file}`


describe('component', () => {
  it('generates expected files', done => {
    helpers.run(__dirname)
      .withArguments(['component'])
      .on('end', () => {
        assert.file([
          'component/index.js',
          'component/template.jade',
          'component/style.sss',
        ].map(p))
        done()
      })
    .on('error', done)
  })


  it('generates index.js right', done => {
    runGeneratorInApp(__dirname, { prompts: { prefix: 'app' } })
      .withArguments(['component'])
      .on('end', () => {
        assert.fileContent([
          [p('component/index.js'), 'function ComponentController'],
          [p('component/index.js'), 'component(\'component\', '],
          [p('component/index.js'), '// replace <app-component />'],
        ])
        done()
      })
      .on('error', done)
  })


  it('generates template.jade right', done => {
    runGeneratorInApp(__dirname, { prompts: { prefix: 'app' } })
      .withArguments(['componentName'])
      .on('end', () => {
        assert.fileContent([
          [p('componentName/template.jade'), '.component-name\n  | componentName'],
        ])
        done()
      })
      .on('error', done)
  })


  it('generates styles.sss right', done => {
    runGeneratorInApp(__dirname, { prompts: { prefix: 'app' } })
      .withArguments(['componentName'])
      .on('end', () => {
        assert.fileContent([
          [p('componentName/style.sss'), '.component-name'],
        ])
        done()
      })
      .on('error', done)
  })
})

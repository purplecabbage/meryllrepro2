/*
* <license header>
*/

// react imports
import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from 'react-error-boundary'

// react spectrum components
import { Provider } from '@react-spectrum/provider'
import { theme } from '@react-spectrum/theme-default'
import { Button } from '@react-spectrum/button'
import { TextField } from '@react-spectrum/textfield'
import { Link } from '@react-spectrum/link'
import { Picker, Item } from '@react-spectrum/picker'
import { Form } from '@react-spectrum/form'
import { Flex } from '@react-spectrum/layout'
import { ProgressCircle } from '@react-spectrum/progress'
import { Heading, Text } from '@react-spectrum/text';

// local imports
import './App.css'


/* Here is your entry point React Component, this class has access to the Adobe Experience Cloud Shell runtime object */

export default class App extends React.Component {
  constructor (props) {
    super(props)

    // error handler on UI rendering failure
    this.onError = (e, componentStack) => {}

    // component to show if UI fails rendering
    this.fallbackComponent = ({ componentStack, error }) => (
      <React.Fragment>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Something went wrong :(</h1>
        <pre>{ componentStack + '\n' + error.message }</pre>
      </React.Fragment>
    )

    this.state = {}

    console.log('runtime object:', this.props.runtime)
    console.log('ims object:', this.props.ims)

    // use exc runtime event handlers
    // respond to configuration change events (e.g. user switches org)
    this.props.runtime.on('configuration', ({ imsOrg, imsToken, locale }) => {
      console.log('configuration change', { imsOrg, imsToken, locale })
    })
    // respond to history change events
    this.props.runtime.on('history', ({ type, path }) => {
      console.log('history change', { type, path })
    })
  }

  static get propTypes () {
    return {
      runtime: PropTypes.any,
      ims: PropTypes.any
    }
  }

  render () {
    return (
      // ErrorBoundary wraps child components to handle eventual rendering errors
      <ErrorBoundary onError={ this.onError } FallbackComponent={ this.fallbackComponent } >
      <Provider UNSAFE_className='provider' theme={ theme }>
        <Flex UNSAFE_className='main'>
          <Heading UNSAFE_className='main-title'>Welcome to meryllrepro2!</Heading>

          <Flex UNSAFE_className='main-doc'>
            <h3 className='doc-title'>Useful documentation for your app</h3>
            <Link UNSAFE_className='doc-item'>
              <a href='https://github.com/AdobeDocs/project-firefly/blob/master/README.md#project-firefly-developer-guide' target='_blank'>
                Firefly Apps
              </a>
            </Link>
            <Link UNSAFE_className='doc-item'>
              <a href='https://github.com/adobe/aio-sdk#adobeaio-sdk' target='_blank'>
                Firefly SDKs
              </a>
            </Link>

            <Link UNSAFE_className='doc-item'>
              <a href='https://react-spectrum.adobe.com/docs/react-spectrum/ActionButton.html' target='_blank'>
                React Spectrum
              </a>
            </Link>
          </Flex>

        </Flex>
      </Provider>
      </ErrorBoundary>
    )
  }
}

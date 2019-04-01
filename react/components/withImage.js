import React, { Component } from 'react'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

/**
 * HOC used for lazily load an image in the 'images' folder right above
 * this component.
 *
 * Used for loading the logos for the Footer
 *
 * @param {Function} getImageFilename
 */
export default getImageFilename => {
  return WrappedComponent => {
    class WithImage extends Component {
      static displayName = `WithImage(${getDisplayName(WrappedComponent)})`

      state = {}

      _isMounted = false

      componentDidMount() {
        const imageName = getImageFilename(this.props)
        this._isMounted = true
        this.lazyImport(imageName)
      }

      componentWillUnmount() {
        this._isMounted = false
      }

      async componentDidUpdate() {
        const imageName = getImageFilename(this.props)
        if (imageName !== this.state.imageName) {
          await this.lazyImport(imageName)
        }
      }

      lazyImport = (imageName) => {
        return import(`../images/${imageName}`).then(imageSrc => {
          if (this._isMounted) {
            this.setState({ imageSrc: imageSrc.default, imageName })
          }
        })
      }

      render() {
        const { imageSrc } = this.state
        return <WrappedComponent {...this.props} imageSrc={imageSrc} />
      }
    }

    return WithImage
  }
}

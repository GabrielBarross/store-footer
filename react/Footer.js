import React from 'react'
import { ExtensionPoint, useChildBlock } from 'vtex.render-runtime'
import LegacyFooter from './legacy/Footer'
import { useDevice } from 'vtex.device-detector'

const Footer = props => {
  const hasFooterDesktop = !!useChildBlock({
    id: 'footer-layout.desktop',
  })
  const hasFooterMobile = !!useChildBlock({
    id: 'footer-layout.mobile',
  })

  const { isMobile } = useDevice()

  const hasFooterLayout = hasFooterDesktop || hasFooterMobile

  if (!hasFooterLayout) {
    return <LegacyFooter {...props} />
  }

  // SSR fallback
  return isMobile ? (
    <ExtensionPoint id="footer-layout.mobile" />
  ) : (
    <ExtensionPoint id="footer-layout.desktop" />
  )
}

Footer.schema = {
  title: 'admin/editor.footer.title',
  description: 'admin/editor.footer.description',
  type: 'object',
  properties: {
    showPaymentFormsInColor: {
      type: 'boolean',
      title: 'admin/editor.footer.showPaymentMethodsInColor.title',
      default: false,
      isLayout: true,
    },
    showSocialNetworksInColor: {
      type: 'boolean',
      title: 'admin/editor.footer.showSocialNetworksInColor.title',
      default: false,
      isLayout: true,
    },
    showVtexLogoInColor: {
      type: 'boolean',
      title: 'admin/editor.footer.showVtexLogoInColor.title',
      default: false,
      isLayout: true,
    },
  },
}

export default Footer

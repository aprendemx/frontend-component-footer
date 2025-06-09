import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
      <footer
        role="contentinfo"
        className="footer d-flex border-top py-3 px-4"
      >
        <div className="container-fluid tutor-container d-flex" id="footer">


            <div className="footer-top">
              <div className="powered-area">
                <ul className="logo-list">

                </ul>
              </div>
              <nav className="nav-colophon" aria-label="About">
                <ol>

                  <li>
                    <a href="/about">Sobre el proyecto</a>
                  </li>

                  <li>
                    <a href="https://mail.mexicox.gob.mx/lists/?p=subscribe">Boletín informativo</a>
                  </li>

                  <li>
                    <a href="/honor">Código de honor</a>
                  </li>

                  <li>
                    <a href="/tos">Aviso de privacidad</a>
                  </li>

                  <li>
                    <a href="/help">Preguntas frecuentes</a>
                  </li>

                  <li>
                    <a href="/contact">Contacto</a>
                  </li>

                  <li>
                    <a href="https://soporte.mexicox.gob.mx">Soporte</a>
                  </li>

                </ol>
              </nav>

              <div className="powered-area" style="text-align: center; padding-left: 30px;padding-top: 8px;">
                <img src="https://sisadmin.mexicox.gob.mx/extramexicox/eduaprende.jpg" alt="Runs on Tutor"
                     height="70px"/>
              </div>

            </div>
            <div style="text-align: center; padding-left: 54px;">
              <span className="copyright-site">©2025. Todos los derechos reservados.</span>
            </div>
            <div className="colophon">


              <p className="copyright">© MexicoX. All rights reserved except where noted. edX, Open edX and their
                respective logos are registered trademarks of edX Inc.
              </p>
            </div>
            <div className="references" style="text-align: center;">
              <!--span>Built on <a href="http://open.edx.org">OpenEdX</a>.</span-->
              <ol>
                <li style="display:inline;">
                  <a href="//www.facebook.com/mexicoXgob/" target="_blank">
                    <img alt="logo fb" src="/static/mexicoxmx/images/logoface.4f6850561440.png" height="40px"
                         style=" margin-left:0.5px; margin-top: 26px"/></a></li>
                <li style="display:inline;">
                  <a href="//twitter.com/MexicoX_gob?lang=es" target="_blank">
                    <img alt="logotipo tw" src="/static/mexicoxmx/images/logox.30bb78edf896.png"
                         style="margin-left:10.5px; margin-top: 26px;" height="40px"/>
                  </a>
                </li>

              </ol>
            </div>

          {showLanguageSelector && (
              <LanguageSelector
                  options={supportedLanguages}
                  onSubmit={onLanguageSelected}
              />
          )}
        </div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export {EVENT_NAMES};

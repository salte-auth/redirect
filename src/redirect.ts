import { Handler, SalteAuthError, Utils } from '@salte-auth/salte-auth';

export class Redirect extends Handler {
  public constructor(config?: Redirect.Config) {
    super(config);

    this.config = Utils.Common.defaults(this.config, {
      timeout: 10000
    });
  }

  public get name() {
    return 'redirect';
  }

  public get auto() {
    return true;
  }

  public connected({ action, handler, provider }: Handler.ConnectedOptions) {
    if (handler !== this.name) return;

    const origin = this.get('origin');

    if (!origin) return;

    this.clear('origin');

    if (!provider) {
      throw new SalteAuthError({
        code: 'unknown_provider',
        message: 'Unable to finish redirect due to an unknown provider!',
      });
    }

    if (action === 'login') {
      provider.validate(Utils.URL.parse(location));
    } else if (action === 'logout') {
      provider.reset();
    } else {
      throw new SalteAuthError({
        code: 'unknown_action',
        message: `Unable to finish redirect due to an unknown action! (${action})`,
      });
    }

    this.navigate(origin);
  }

  public open({ url, timeout = this.config.timeout }: Redirect.OpenOptions) {
    this.set('origin', location.href);

    this.navigate(url);

    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(new SalteAuthError({
          code: 'redirect_timeout',
          message: `Timed out while redirecting.`,
        }));
      }, timeout);
    });
  }
}

export interface Redirect {
  config: Redirect.Config;
}

export declare namespace Redirect {
  export interface Config extends Handler.Config {
    /**
     * The amount of time in ms before any login / logout requests will timeout.
     *
     * @default 10000
     */
    timeout?: number;
  }

  export interface OpenOptions extends Handler.OpenOptions {
    /**
     * Override the configured timeout.
     */
    timeout?: number;
  }
}

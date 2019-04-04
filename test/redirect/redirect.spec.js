import { expect } from 'chai';
import sinon from 'sinon';
import { Redirect } from '../../src/redirect';

describe('Redirect', () => {
  /** @type {Redirect} */
  let redirect;
  beforeEach(() => {
    redirect = new Redirect();
    sinon.stub(redirect, 'clear');
    sinon.stub(redirect, 'navigate');
  });

  describe('getter(name)', () => {
    it('should default the name to "redirect"', () => {
      expect(redirect.$name).to.equal('redirect');
    });
  });

  describe('getter(auto)', () => {
    it('should support automatic login', () => {
      expect(redirect.auto).to.equal(true);
    });
  });

  describe('getter(connected)', () => {
    let provider;
    beforeEach(() => {
      provider = {
        validate: sinon.stub(),
        reset: sinon.stub(),
        emit: sinon.stub()
      };
    });

    it('should support logging in', async () => {
      sinon.stub(redirect, 'get').returns('https://google.com');

      const promise = redirect.connected({
        action: 'login',
        handler: 'redirect',
        provider: provider
      });

      expect(provider.validate.callCount).to.equal(0);
      expect(redirect.navigate.callCount).to.equal(0);

      await promise;

      expect(provider.validate.callCount).to.equal(1);
      expect(provider.reset.callCount).to.equal(0);
      expect(redirect.navigate.callCount).to.equal(1);
    });

    it('should support logging out', async () => {
      sinon.stub(redirect, 'get').returns('https://google.com');

      await redirect.connected({
        action: 'logout',
        handler: 'redirect',
        provider: provider
      });

      expect(provider.reset.callCount).to.equal(1);
      expect(provider.emit.callCount).to.equal(1);
      expect(provider.validate.callCount).to.equal(0);
      expect(redirect.navigate.callCount).to.equal(1);
    });

    it(`should throw an error for unknown actions`, async () => {
      sinon.stub(redirect, 'get').returns('https://google.com');

      try {
        await redirect.connected({
          action: 'unknown',
          handler: 'redirect',
          provider
        });

        throw Error('No error was thrown when we expected one.');
      } catch (error) {
        expect(error.code).to.equal('unknown_action');
        expect(provider.reset.callCount).to.equal(0);
        expect(provider.validate.callCount).to.equal(0);
        expect(redirect.navigate.callCount).to.equal(0);
      }
    });

    it(`should throw an error if a provider isn't given`, async () => {
      sinon.stub(redirect, 'get').returns('https://google.com');

      try {
        await redirect.connected({
          action: 'logout',
          handler: 'redirect',
          provider: null
        });

        throw Error('No error was thrown when we expected one.');
      } catch (error) {
        expect(error.code).to.equal('unknown_provider');
        expect(provider.reset.callCount).to.equal(0);
        expect(provider.validate.callCount).to.equal(0);
        expect(redirect.navigate.callCount).to.equal(0);
      }
    });

    it(`should bail if we aren't the active handler`, async () => {
      sinon.stub(redirect, 'get').returns('https://google.com');

      await redirect.connected({
        action: 'login',
        handler: 'tab',
        provider
      });

      expect(provider.reset.callCount).to.equal(0);
      expect(provider.validate.callCount).to.equal(0);
      expect(redirect.navigate.callCount).to.equal(0);
    });

    it(`should bail if we don't have an origin`, async () => {
      sinon.stub(redirect, 'get').returns(null);

      await redirect.connected({
        action: 'login',
        handler: 'redirect',
        provider
      });

      expect(provider.reset.callCount).to.equal(0);
      expect(provider.validate.callCount).to.equal(0);
      expect(redirect.navigate.callCount).to.equal(0);
    });
  });

  describe('getter(open)', () => {
    it('should redirect the user to the given url', () => {
      redirect.open({
        url: 'https://google.com'
      });

      expect(redirect.get('origin')).to.equal(location.href);
      expect(redirect.navigate.callCount).to.equal(1);
    });

    it('should support timing out', async () => {
      const error = await redirect.open({
        url: 'https://google.com',
        timeout: 0
      }).catch((error) => error);

      expect(error).to.be.an.instanceOf(Error);
      expect(error.code).to.equal('redirect_timeout');
    });
  });
});

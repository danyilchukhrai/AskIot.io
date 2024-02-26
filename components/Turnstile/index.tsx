import { TURNSTILE_SITE_KEY } from '@/configs/appConfig';
import { Turnstile as ReactTurnstile } from '@marsidev/react-turnstile';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export type TurnstileState = 'error' | 'success' | 'expired';

interface ITurnstileProps {
  onStateChange?: (state?: TurnstileState) => void;
  errorMessage?: string;
  onSuccess?: (token: string) => void;
}

export interface ITurnstileElement {
  reset: () => void;
}

const Turnstile = forwardRef<ITurnstileElement, ITurnstileProps>(
  ({ onStateChange, onSuccess, errorMessage }, ref) => {
    const turnstileRef = useRef<any>();

    useImperativeHandle(
      ref,
      () => ({
        reset: () => turnstileRef.current?.reset(),
      }),
      [],
    );

    return (
      <div>
        <ReactTurnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onError={() => onStateChange && onStateChange('error')}
          onExpire={() => onStateChange && onStateChange('expired')}
          onSuccess={(token) => {
            onStateChange && onStateChange('success');
            onSuccess && onSuccess(token);
          }}
        />
        {errorMessage && <p className="text-red-500 text-s mt-2 error-msg">{errorMessage}</p>}
      </div>
    );
  },
);

export default Turnstile;

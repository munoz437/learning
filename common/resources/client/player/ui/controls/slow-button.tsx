import { usePlayerStore } from '@common/player/hooks/use-player-store';
import { usePlayerActions } from '@common/player/hooks/use-player-actions';
import { IconButton } from '@common/ui/buttons/icon-button';
import { ButtonProps } from '@common/ui/buttons/button';
import { SlowIcon } from '@common/icons/media/media-slow';
import { Tooltip } from '@common/ui/tooltip/tooltip';
import { Trans } from '@common/i18n/trans';
import React, { useState } from 'react';

interface Props {
  color?: ButtonProps['color'];
  size?: ButtonProps['size'];
  iconSize?: ButtonProps['size'];
  className?: string;
  stopPropagation?: boolean;
}

export function SlowButton({
  size = 'md',
  iconSize,
  color,
  className,
  stopPropagation,
}: Props) {
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  const [isSlow, setIsSlow] = useState(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (isSlow) {
      // Si ya está en modo lento, volver a la velocidad normal
      player.setPlaybackSpeed(1);
    } else {
      // Si no está en modo lento, cambiar a velocidad lenta (por ejemplo, 0.5x)
      player.setPlaybackSpeed(0.5);
    }
    setIsSlow(!isSlow); // Cambiar el estado para reflejar el cambio de velocidad
  };

  return (
    <Tooltip label={<Trans message={isSlow ? 'Normal' : 'Lento'} />}>
      <IconButton
        disabled={!playerReady}
        size={size}
        color={color}
        iconSize={iconSize}
        className={className}
        onClick={handleButtonClick}
      >
        <SlowIcon />
      </IconButton>
    </Tooltip>
  );
}

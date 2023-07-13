import { usePlayerStore } from '@common/player/hooks/use-player-store';
import { usePlayerActions } from '@common/player/hooks/use-player-actions';
import { IconButton } from '@common/ui/buttons/icon-button';
import { ButtonProps } from '@common/ui/buttons/button';
import { FastIcon } from '@common/icons/media/media-fast';
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

export function FastButton({
  size = 'md',
  iconSize,
  color,
  className,
  stopPropagation,
}: Props) {
  const player = usePlayerActions();
  const playerReady = usePlayerStore((s) => s.providerReady);
  const [isFast, setIsFast] = useState(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (isFast) {
      // Si ya está en modo rápido, volver a la velocidad normal
      player.setPlaybackSpeed(1);
    } else {
      // Si no está en modo rápido, cambiar a velocidad rápida (por ejemplo, 2x)
      player.setPlaybackSpeed(2);
    }
    setIsFast(!isFast); // Cambiar el estado para reflejar el cambio de velocidad
  };

  return (
    <Tooltip label={<Trans message={isFast ? 'Normal' : 'Rapido'} />}>
      <IconButton
        disabled={!playerReady}
        size={size}
        color={color}
        iconSize={iconSize}
        className={className}
        onClick={handleButtonClick}
      >
         <FastIcon />
      </IconButton>
    </Tooltip>
  );
}

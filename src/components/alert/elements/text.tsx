import { AnimatePresence, motion } from 'framer-motion';
import { selectAnimation, selectAnimationOut } from '~/utils/common/animations';
import type { AlertElementTextSettings } from '~/types/schemas/alert';
import type { Milliseconds, Pixels } from '~/types/types/custom';

export interface AlertTextProps {
  settings: AlertElementTextSettings;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
  id: string;
  lock?: boolean;
  animation_in: string;
  animation_out: string;
  timestamp: Milliseconds;
  start_time: Milliseconds;
  duration: Milliseconds;
}

export const AlertText = (props: AlertTextProps) => {
  const {
    settings,
    width,
    height,
    posX,
    posY,
    id,
    lock = false,
    animation_in,
    animation_out,
    timestamp,
    start_time,
    duration,
  } = props;

  const animationVariants = {
    initial: selectAnimation(animation_in).initial,
    in: {
      ...selectAnimation(animation_in).animate,
      transition: selectAnimation(animation_in).transition,
    },
    out: {
      ...selectAnimationOut(animation_out).animate,
      transition: selectAnimationOut(animation_out).transition,
    },
  };

  return (
    <AnimatePresence>
      {timestamp >= start_time && timestamp <= start_time + duration && (
        <motion.div variants={animationVariants} initial="initial" animate="in" exit="out">
          <div
            className={`absolute  ${
              !lock && 'draggable-alert hover:outline hover:outline-1 hover:outline-white/30'
            }`}
            style={{
              width: width,
              height: height,
              display: 'block',
              fontFamily: settings.text.fontFamily,
              fontSize: settings.text.fontSize + 'px',
              fontWeight: settings.text.fontWeight,
              color: settings.text.color,
              textAlign: settings.text.textAlign as 'left' | 'center' | 'right',
              textDecoration: settings.text.textDecoration,
              fontStyle: settings.text.fontStyle,
              letterSpacing: settings.text.letterSpacing + 'px',
              lineHeight: settings.text.lineHeight + '%',
              textShadow: `${settings.text.textShadow.shadowOffsetX}px ${settings.text.textShadow.shadowOffsetY}px ${settings.text.textShadow.shadowBlur}px ${settings.text.textShadow.shadowColor}`,
              background: settings.background,
              boxShadow: `${settings.shadow.shadowOffsetX}px ${settings.shadow.shadowOffsetY}px ${settings.shadow.shadowBlur}px ${settings.shadow.shadowColor}`,
              borderTop: `${settings.border.top.width}px ${settings.border.top.style} ${settings.border.top.color}`,
              borderRight: `${settings.border.right.width}px ${settings.border.right.style} ${settings.border.right.color}`,
              borderBottom: `${settings.border.bottom.width}px ${settings.border.bottom.style} ${settings.border.bottom.color}`,
              borderLeft: `${settings.border.left.width}px ${settings.border.left.style} ${settings.border.left.color}`,
              padding: `${settings.padding.top}px ${settings.padding.right}px ${settings.padding.bottom}px ${settings.padding.left}px`,
              borderRadius: `${settings.radius.top_left}px ${settings.radius.top_right}px ${settings.radius.bottom_right}px ${settings.radius.bottom_left}px`,
              transform: `translate(${posX}px, ${posY}px)`,
            }}
            data-x={posX}
            data-y={posY}
            data-id={id}
          >
            {settings.is_dynamic ? settings.dynamic_content : settings.content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

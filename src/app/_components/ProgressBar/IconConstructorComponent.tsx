/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

import {
  CheckIcon,
  ChurchIcon,
  HealthIcon,
  PaymentIcon,
  UserIcon,
  FinishIcon,
  TicketIcon,
  ClipboardIcon,
  HotelIcon,
} from './IconElementsComponent';

import { ICON_TYPE } from '@jebe/utils/constants';

interface IconsProps {
  iconType: string;
}

const IconConstructorComponent: React.FC<IconsProps> = ({ iconType }) => {
  const IconDictionary = {
    [ICON_TYPE.CHURCH]: ChurchIcon,
    [ICON_TYPE.HEALTH]: HealthIcon,
    [ICON_TYPE.USER]: UserIcon,
    [ICON_TYPE.PAYMENT]: PaymentIcon,
    [ICON_TYPE.FINISH]: FinishIcon,
    [ICON_TYPE.CHECK]: CheckIcon,
    [ICON_TYPE.TICKET]: TicketIcon,
    [ICON_TYPE.CLIPBOARD]: ClipboardIcon,
    [ICON_TYPE.HOTEL]: HotelIcon,
  };

  const IconConstructor = IconDictionary[iconType];

  if (!IconConstructor) {
    return null;
  }

  return <IconConstructor size={20} />;
};

export default IconConstructorComponent;

import React from 'react';
import { 
    FaChurch,
    FaBriefcase,
    FaCreditCard,
    FaUser,
    FaCheck,
    FaTicket,
    FaClipboardCheck,
    FaHotel
 } from "react-icons/fa6";

interface IconsProps {
    size: number;
}

export const ChurchIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaChurch size={size}/>;
};

export const HealthIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaBriefcase size={size} />;
};

export const UserIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaUser size={size} />;
};

export const PaymentIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaCreditCard size={size} />;
};

export const FinishIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaCheck size={size} />;
};

export const CheckIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaCheck size={size} />;
};

export const ClipboardIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaClipboardCheck size={size} />;
};

export const TicketIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaTicket size={size} />;
};

export const HotelIcon: React.FC<IconsProps> = ({ size }) => {
  return <FaHotel size={size} />;
};

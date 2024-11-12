import React from "react";

const StatusBadge = ({ status, className }) => (
  <span className={`px-2 py-1 rounded-full text-sm ${className}`}>
    {status}
  </span>
);

export default StatusBadge;
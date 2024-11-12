export const CalendarStyles = () => (
  <style>
    {`
      .fullcalendar-custom .fc {
        max-height: 80vh;
        min-height: 500px;
        background: var(--background);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: var(--shadow-neo);
      }
      .fullcalendar-custom .fc-toolbar-title {
        font-size: 1.25rem !important;
        font-weight: 600;
        color: var(--foreground);
      }
      .fullcalendar-custom .fc-button {
        background: var(--accent) !important;
        border: none !important;
        box-shadow: var(--shadow-neo-sm);
        font-size: 0.875rem !important;
        padding: 0.5rem 0.75rem !important;
        font-weight: 500;
        border-radius: 0.5rem !important;
      }
      .fullcalendar-custom .fc-button:hover {
        opacity: 0.9;
      }
      .fullcalendar-custom .fc-button-active {
        background: var(--primary) !important;
        color: var(--primary-foreground) !important;
      }
      .fullcalendar-custom .fc-toolbar {
        padding: 1rem;
        margin-bottom: 0 !important;
        gap: 0.5rem;
      }
      .fullcalendar-custom .fc-view {
        padding: 0.5rem;
      }
      .fullcalendar-custom .fc-scrollgrid {
        border: none !important;
      }
      .fullcalendar-custom .fc-scrollgrid td {
        border: 1px solid var(--border) !important;
      }
      .fullcalendar-custom .fc-col-header-cell {
        background: var(--accent);
        padding: 0.75rem 0.5rem;
        font-weight: 600;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .fullcalendar-custom .fc-daygrid-day {
        min-height: 100px !important;
      }
      .fullcalendar-custom .fc-daygrid-day-number {
        font-size: 0.875rem;
        padding: 0.25rem 0.5rem;
        opacity: 0.8;
      }
      .fullcalendar-custom .fc-daygrid-day-events {
        margin: 0 !important;
        padding: 0.25rem;
      }
      .fullcalendar-custom .fc-event {
        margin: 1px 0 !important;
        padding: 0.25rem 0.5rem !important;
        font-size: 0.75rem !important;
        border-radius: 0.25rem !important;
        border: none !important;
        cursor: pointer !important;
        white-space: normal !important;
        line-height: 1.2 !important;
        min-height: 2.5rem;
      }
      .fullcalendar-custom .fc-event:hover {
        filter: brightness(1.1);
      }
      .fullcalendar-custom .fc-more-link {
        background: var(--accent);
        color: var(--accent-foreground);
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        margin: 0.125rem 0;
        font-size: 0.75rem;
      }
      .fullcalendar-custom .fc-daygrid-more-link {
        font-weight: 500;
      }
      .fullcalendar-custom .fc-popover {
        background: var(--background);
        border: 1px solid var(--border);
        box-shadow: var(--shadow-neo);
        border-radius: 0.5rem;
        max-width: 300px !important;
      }
      .fullcalendar-custom .fc-popover-header {
        background: var(--accent);
        padding: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .fullcalendar-custom .fc-popover-body {
        padding: 0.5rem;
      }
      .fullcalendar-custom .fc-day-today {
        background: var(--accent) !important;
      }
      @media (max-width: 640px) {
        .fullcalendar-custom .fc-toolbar {
          flex-direction: column;
          align-items: stretch;
        }
        .fullcalendar-custom .fc-toolbar-chunk {
          display: flex;
          justify-content: center;
          margin: 0.25rem 0;
        }
        .fullcalendar-custom .fc-event {
          font-size: 0.7rem !important;
        }
      }
    `}
  </style>
);
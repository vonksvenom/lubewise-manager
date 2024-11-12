export const CalendarStyles = () => (
  <style>
    {`
      .fullcalendar-custom .fc {
        max-height: calc(100vh - 350px);
        min-height: 550px;
      }
      .fullcalendar-custom .fc-toolbar-title {
        font-size: 1.75rem !important;
        font-weight: 700;
        color: var(--foreground);
        letter-spacing: -0.025em;
      }
      .fullcalendar-custom .fc-button {
        background: var(--accent) !important;
        border: none !important;
        box-shadow: var(--shadow-neo-sm);
        transition: all 0.2s;
        text-transform: capitalize;
        padding: 0.5rem 1rem;
        font-weight: 500;
        border-radius: 0.5rem !important;
      }
      .fullcalendar-custom .fc-button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      .fullcalendar-custom .fc-button-active {
        background: var(--primary) !important;
      }
      .fullcalendar-custom .fc-toolbar {
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.5rem !important;
        padding: 1rem;
        background: transparent;
      }
      .fullcalendar-custom .fc-view {
        background: var(--background);
        border-radius: 1rem;
        overflow: hidden;
        border: 1px solid var(--border);
      }
      .fullcalendar-custom .fc-scrollgrid {
        border: none !important;
      }
      .fullcalendar-custom .fc-scrollgrid td {
        border: 1px solid var(--border) !important;
      }
      .fullcalendar-custom .fc-col-header-cell {
        background: var(--accent);
        padding: 1rem;
        font-weight: 600;
        color: var(--foreground);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 0.75rem;
      }
      .fullcalendar-custom .fc-daygrid-day {
        min-height: 120px !important;
        transition: background-color 0.2s;
      }
      .fullcalendar-custom .fc-daygrid-day:hover {
        background: var(--accent);
      }
      .fullcalendar-custom .fc-daygrid-day-number {
        font-size: 0.875rem;
        padding: 0.5rem;
        color: var(--foreground);
        font-weight: 500;
        opacity: 0.8;
      }
      .fullcalendar-custom .fc-daygrid-day-events {
        margin: 0 !important;
        padding: 0.25rem;
      }
      .fullcalendar-custom .fc-event {
        margin: 2px 0 !important;
        padding: 0.375rem 0.75rem !important;
        font-size: 0.8125rem !important;
        border-radius: 0.375rem !important;
        cursor: pointer !important;
        border: none !important;
        transition: all 0.2s;
        font-weight: 500;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      .fullcalendar-custom .fc-event:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }
      .fullcalendar-custom .fc-more-link {
        font-size: 0.75rem !important;
        padding: 0.25rem 0.5rem !important;
        margin: 0.25rem 0 !important;
        background: var(--accent);
        color: var(--foreground);
        border-radius: 0.375rem;
        transition: all 0.2s;
        font-weight: 500;
      }
      .fullcalendar-custom .fc-more-link:hover {
        background: var(--primary);
        text-decoration: none;
      }
      .fullcalendar-custom .fc-day-today {
        background: var(--accent) !important;
      }
      .fullcalendar-custom .fc-popover {
        background: var(--background);
        border: 1px solid var(--border);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        backdrop-filter: blur(8px);
        padding: 0.5rem;
      }
      .fullcalendar-custom .fc-popover-header {
        background: var(--accent);
        padding: 0.5rem;
        color: var(--foreground);
        font-weight: 600;
        border-radius: 0.25rem;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
      }
    `}
  </style>
);
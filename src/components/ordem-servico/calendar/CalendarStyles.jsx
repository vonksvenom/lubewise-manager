export const CalendarStyles = () => (
  <style>
    {`
      .fullcalendar-custom .fc {
        max-height: calc(100vh - 350px);
        min-height: 550px;
      }
      .fullcalendar-custom .fc-toolbar-title {
        font-size: 1.5rem !important;
        font-weight: 700;
        background: linear-gradient(to right, var(--primary), var(--accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .fullcalendar-custom .fc-button {
        background: var(--primary) !important;
        border: none !important;
        box-shadow: var(--shadow-neo-sm);
        transition: all 0.2s;
        text-transform: capitalize;
        padding: 0.75rem 1.25rem;
        font-weight: 600;
        letter-spacing: 0.025em;
      }
      .fullcalendar-custom .fc-button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: var(--shadow-neo);
      }
      .fullcalendar-custom .fc-button-active {
        background: var(--accent) !important;
        opacity: 0.9;
      }
      .fullcalendar-custom .fc-toolbar {
        flex-wrap: wrap;
        gap: 1.5rem;
        margin-bottom: 2rem !important;
        padding: 1rem;
        background: var(--background);
        border-radius: 1rem;
        box-shadow: var(--shadow-neo-sm);
      }
      .fullcalendar-custom .fc-view {
        background: var(--background);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: var(--shadow-neo);
        backdrop-filter: blur(8px);
      }
      .fullcalendar-custom .fc-scrollgrid {
        border: none !important;
      }
      .fullcalendar-custom .fc-scrollgrid td {
        border: 1px solid var(--border) !important;
      }
      .fullcalendar-custom .fc-col-header-cell {
        background: var(--accent);
        padding: 1.25rem 0.75rem;
        font-weight: 700;
        color: var(--foreground);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 0.875rem;
      }
      .fullcalendar-custom .fc-daygrid-day {
        min-height: 100px !important;
        max-height: 140px !important;
        transition: all 0.2s;
      }
      .fullcalendar-custom .fc-daygrid-day:hover {
        background: var(--accent);
        transform: scale(1.02);
        z-index: 1;
      }
      .fullcalendar-custom .fc-daygrid-day-number {
        font-size: 1rem;
        padding: 0.75rem;
        color: var(--foreground);
        font-weight: 600;
      }
      .fullcalendar-custom .fc-daygrid-day-events {
        margin: 0 !important;
        padding: 0.25rem;
      }
      .fullcalendar-custom .fc-event {
        margin: 2px 0 !important;
        padding: 4px 8px !important;
        font-size: 0.875rem !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        border: none !important;
        transition: all 0.2s;
        font-weight: 500;
        box-shadow: var(--shadow-neo-sm);
      }
      .fullcalendar-custom .fc-event:hover {
        transform: translateX(4px);
        box-shadow: var(--shadow-neo);
      }
      .fullcalendar-custom .fc-more-link {
        font-size: 0.875rem !important;
        padding: 4px 8px !important;
        margin: 4px 0 !important;
        background: var(--accent);
        color: var(--foreground);
        border-radius: 6px;
        transition: all 0.2s;
        font-weight: 500;
      }
      .fullcalendar-custom .fc-more-link:hover {
        background: var(--muted);
        text-decoration: none;
        transform: translateX(2px);
      }
      .fullcalendar-custom .fc-day-today {
        background: var(--accent) !important;
      }
      .fullcalendar-custom .fc-popover {
        background: var(--background);
        border: none;
        box-shadow: var(--shadow-neo-xl);
        border-radius: 1rem;
        backdrop-filter: blur(16px);
        padding: 0.5rem;
      }
      .fullcalendar-custom .fc-popover-header {
        background: var(--accent);
        padding: 0.75rem;
        color: var(--foreground);
        font-weight: 600;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
      }
    `}
  </style>
);
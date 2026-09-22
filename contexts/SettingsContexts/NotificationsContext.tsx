import { createContext } from "react";

const initialValues = {
  notificationsEnabled: false,
};

const initialNotificationsContext = {
  ...initialValues,
  toggleNotifications: (_newValue?: boolean) => {},
};

export const NotificationsContext = createContext(initialNotificationsContext);

export function NotificationsProvider({ children }: React.PropsWithChildren) {
  const notificationsEnabled = false;

  const toggleNotifications = (_newValue?: boolean) => {
    alert("Push notifications are not available in this build");
    return;
  };

  return (
    <NotificationsContext.Provider
      value={{
        notificationsEnabled,
        toggleNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

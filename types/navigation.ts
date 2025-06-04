export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Homescreen: undefined;
  Badminton: undefined;
  Basketball: undefined;
  Tennis: undefined;
  Swimming: undefined;
  Football: undefined;
  Yoga: undefined;
  BookingConfirmation: {
    sport: string;
    date: string;
    time: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

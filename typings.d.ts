interface IMessage {
  text: string;
  createdAt: any;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

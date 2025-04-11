
interface User {
    id: number;
    name: string;
    totalComments?: number;
  }
  
  const getRandomUserImage = () =>
    `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;
  

  const UserCard = ({ user }: { user: User }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
        <img src={getRandomUserImage()} className="w-20 h-20 rounded-full" alt="User" />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">Total Comments: {user.totalComments ?? 0}</p>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  
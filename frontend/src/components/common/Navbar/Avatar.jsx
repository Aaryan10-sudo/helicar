const Avatar = ({ img }) => {
  return (
    <div className="relative flex items-center justify-center">
      <img
        src={img}
        alt="avatar"
        className="h-12 w-12 rounded-full border-5 border-purple-500"
      />
    </div>
  );
};

export default Avatar;

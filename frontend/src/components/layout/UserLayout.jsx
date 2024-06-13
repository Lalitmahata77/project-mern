
import SideMenu from "./SideMenu";

const UserLayout = ({ children }) => {
  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center font-bold text-4xl">User Settings</h2>
      </div>

      <div className="container">
        <div className="row justify-around">
          <div className="  justify-center items-center">
            <SideMenu />
          </div>
          <div className="col-span-12 lg:col-span-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
import React, { useState, createContext, ReactNode, useContext } from "react";

// contextの型定義
type AuthContextProps = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
};

// Contextの生成と初期値設定
const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => {},
});
// Globalに管理する状態宣言
export const AuthProvider = (props: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

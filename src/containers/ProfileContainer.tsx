import React, { useEffect, useState } from "react";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

const ProfileContainer = () => {
  const [profile, setProfile] = useState<any>(undefined);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const result = await authService.getProfile();
    setProfile(result && result.data);
    console.log(result);
  };

  return (
    <div>
      <li>
        <ul>Email: {profile && profile.email}</ul>
        <ul>Gender: {profile && profile.gender}</ul>
        <ul>Name: {profile && profile.name}</ul>
        <ul>Nationality: {profile && profile.nationality}</ul>
        <ul></ul>
      </li>
    </div>
  );
};

export default RequireAuth(ProfileContainer);

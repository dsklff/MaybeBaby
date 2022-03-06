import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

const ProfileContainer = () => {
  const [profile, setProfile] = useState<any>(undefined);
  let navigate = useNavigate();

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
        <ul>Name: {profile && profile.name}</ul>
        <ul>Gender: {profile && profile.gender}</ul>
        <ul>Nationality: {profile && profile.nationality}</ul>
        <ul>Date of birthday: {profile && profile.dob}</ul>
      </li>
      <button onClick={() => navigate("/editprofile", { replace: true })}>
        Edit profile
      </button>
    </div>
  );
};

export default RequireAuth(ProfileContainer);

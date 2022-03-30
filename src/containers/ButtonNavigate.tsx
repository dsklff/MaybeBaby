import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LabelBottomNavigation = () => {
  const [value, setValue] = React.useState("recents");
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const TestIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 22"
        fill="#6767AB"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.78217 6.93844L2.8995 7.67921H2.8995L2.78217 6.93844ZM6.93844 2.78217L7.67921 2.8995V2.8995L6.93844 2.78217ZM16.9389 20.0451L16.4981 19.4383L16.9389 20.0451ZM18.0451 18.9389L17.4383 18.4981L18.0451 18.9389ZM1.95491 18.9389L2.56168 18.4981L1.95491 18.9389ZM3.06107 20.0451L3.50191 19.4383L3.06107 20.0451ZM3.06107 1.95491L2.62024 1.34815L3.06107 1.95491ZM1.95491 3.06107L1.34815 2.62023L1.95491 3.06107ZM16.9389 1.95491L16.4981 2.56168L16.9389 1.95491ZM18.0451 3.06107L17.4383 3.50191L18.0451 3.06107ZM7 1.02893L6.97432 0.279368L7 1.02893ZM1.02893 7L0.279369 6.97432L1.02893 7ZM9.25 16C9.25 16.4142 9.58579 16.75 10 16.75C10.4142 16.75 10.75 16.4142 10.75 16H9.25ZM5.46731 10.672C5.17573 10.9662 5.17784 11.4411 5.47204 11.7327C5.76624 12.0243 6.24111 12.0222 6.53269 11.728L5.46731 10.672ZM7.39785 9.78962L7.93054 10.3176H7.93054L7.39785 9.78962ZM12.6022 9.78962L12.0695 10.3176L12.6022 9.78962ZM13.4673 11.728C13.7589 12.0222 14.2338 12.0243 14.528 11.7327C14.8222 11.4411 14.8243 10.9662 14.5327 10.672L13.4673 11.728ZM9.74933 8.01591L9.65451 7.27193H9.6545L9.74933 8.01591ZM10.2507 8.01591L10.3455 7.27193H10.3455L10.2507 8.01591ZM10 8V7.25V8ZM2.8995 7.67921C5.35988 7.28952 7.28952 5.35988 7.67921 2.8995L6.19768 2.66485C5.90965 4.48339 4.48339 5.90965 2.66485 6.19768L2.8995 7.67921ZM0.25 10V12H1.75V10H0.25ZM19.75 12V10H18.25V12H19.75ZM10 21.75C11.8582 21.75 13.312 21.751 14.4635 21.6263C15.6291 21.5 16.5734 21.2377 17.3798 20.6518L16.4981 19.4383C15.9901 19.8074 15.3399 20.0225 14.302 20.135C13.25 20.249 11.8916 20.25 10 20.25V21.75ZM18.25 12C18.25 13.8916 18.249 15.25 18.135 16.302C18.0225 17.3399 17.8074 17.9901 17.4383 18.4981L18.6518 19.3798C19.2377 18.5734 19.5 17.6291 19.6263 16.4635C19.751 15.312 19.75 13.8582 19.75 12H18.25ZM17.3798 20.6518C17.8679 20.2972 18.2972 19.8679 18.6518 19.3798L17.4383 18.4981C17.1762 18.8589 16.8589 19.1762 16.4981 19.4383L17.3798 20.6518ZM0.25 12C0.25 13.8582 0.24897 15.312 0.373727 16.4635C0.500005 17.6291 0.762323 18.5734 1.34815 19.3798L2.56168 18.4981C2.19259 17.9901 1.97745 17.3399 1.865 16.302C1.75103 15.25 1.75 13.8916 1.75 12H0.25ZM10 20.25C8.10843 20.25 6.74999 20.249 5.69804 20.135C4.66013 20.0225 4.00992 19.8074 3.50191 19.4383L2.62024 20.6518C3.42656 21.2377 4.37094 21.5 5.53648 21.6263C6.68798 21.751 8.14184 21.75 10 21.75V20.25ZM1.34815 19.3798C1.70281 19.8679 2.13209 20.2972 2.62024 20.6518L3.50191 19.4383C3.14111 19.1762 2.82381 18.8589 2.56168 18.4981L1.34815 19.3798ZM2.62024 1.34815C2.13209 1.70281 1.70281 2.13209 1.34815 2.62023L2.56168 3.50191C2.82381 3.14111 3.14111 2.82382 3.50191 2.56168L2.62024 1.34815ZM10 1.75C11.8916 1.75 13.25 1.75103 14.302 1.865C15.3399 1.97745 15.9901 2.19259 16.4981 2.56168L17.3798 1.34815C16.5734 0.762324 15.6291 0.500006 14.4635 0.373728C13.312 0.248971 11.8582 0.25 10 0.25V1.75ZM19.75 10C19.75 8.14184 19.751 6.68798 19.6263 5.53648C19.5 4.37094 19.2377 3.42656 18.6518 2.62023L17.4383 3.50191C17.8074 4.00992 18.0225 4.66013 18.135 5.69804C18.249 6.74999 18.25 8.10843 18.25 10H19.75ZM16.4981 2.56168C16.8589 2.82382 17.1762 3.14111 17.4383 3.50191L18.6518 2.62023C18.2972 2.13209 17.8679 1.70281 17.3798 1.34815L16.4981 2.56168ZM10 0.25C8.83522 0.25 7.83424 0.249906 6.97432 0.279368L7.02568 1.77849C7.85445 1.75009 8.82692 1.75 10 1.75V0.25ZM6.97432 0.279368C5.10087 0.343555 3.7239 0.546296 2.62024 1.34815L3.50191 2.56168C4.20746 2.04907 5.17075 1.84204 7.02568 1.77849L6.97432 0.279368ZM6.25 1.02892C6.24999 1.96617 6.24707 2.35298 6.19768 2.66485L7.67921 2.8995C7.75165 2.44215 7.74999 1.91121 7.75 1.02893L6.25 1.02892ZM1.75 10C1.75 8.82692 1.75009 7.85445 1.77849 7.02568L0.279369 6.97432C0.249906 7.83424 0.25 8.83522 0.25 10H1.75ZM1.77849 7.02568C1.84204 5.17075 2.04907 4.20746 2.56168 3.50191L1.34815 2.62023C0.546295 3.7239 0.343555 5.10087 0.279369 6.97432L1.77849 7.02568ZM1.02893 7.75C1.91121 7.74999 2.44215 7.75165 2.8995 7.67921L2.66485 6.19768C2.35298 6.24707 1.96618 6.24999 1.02892 6.25L1.02893 7.75ZM10.75 16V8.8H9.25V16H10.75ZM6.53269 11.728L7.93054 10.3176L6.86516 9.26167L5.46731 10.672L6.53269 11.728ZM12.0695 10.3176L13.4673 11.728L14.5327 10.672L13.1348 9.26167L12.0695 10.3176ZM7.93054 10.3176C8.50033 9.74268 8.88386 9.35733 9.20649 9.09823C9.51728 8.84863 9.698 8.77852 9.84416 8.75989L9.6545 7.27193C9.12131 7.33989 8.68367 7.59426 8.26724 7.92869C7.86265 8.25361 7.41012 8.71182 6.86516 9.26167L7.93054 10.3176ZM13.1348 9.26167C12.5899 8.71182 12.1373 8.25362 11.7328 7.92869C11.3163 7.59427 10.8787 7.33989 10.3455 7.27193L10.1558 8.75989C10.302 8.77852 10.4827 8.84863 10.7935 9.09823C11.1161 9.35733 11.4997 9.74268 12.0695 10.3176L13.1348 9.26167ZM9.84416 8.75989C9.89591 8.7533 9.94796 8.75 10 8.75V7.25C9.8846 7.25 9.76921 7.25731 9.65451 7.27193L9.84416 8.75989ZM10 8.75C10.052 8.75 10.1041 8.7533 10.1558 8.75989L10.3455 7.27193C10.2308 7.25731 10.1154 7.25 10 7.25V8.75ZM10.75 8.8V8H9.25V8.8H10.75Z"
          fill="#6767AB"
        />
      </svg>
    );
  };

  const UserIcon = () => {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.25 8C14.25 9.79493 12.7949 11.25 11 11.25V12.75C13.6234 12.75 15.75 10.6234 15.75 8H14.25ZM11 11.25C9.20507 11.25 7.75 9.79493 7.75 8H6.25C6.25 10.6234 8.37665 12.75 11 12.75V11.25ZM7.75 8C7.75 6.20507 9.20507 4.75 11 4.75V3.25C8.37665 3.25 6.25 5.37665 6.25 8H7.75ZM11 4.75C12.7949 4.75 14.25 6.20507 14.25 8H15.75C15.75 5.37665 13.6234 3.25 11 3.25V4.75ZM8 15.75H14V14.25H8V15.75ZM1.75 11C1.75 5.89137 5.89137 1.75 11 1.75V0.25C5.06294 0.25 0.25 5.06294 0.25 11H1.75ZM11 1.75C16.1086 1.75 20.25 5.89137 20.25 11H21.75C21.75 5.06294 16.9371 0.25 11 0.25V1.75ZM20.25 11C20.25 13.6233 19.159 15.9905 17.4039 17.6748L18.4425 18.7571C20.4801 16.8016 21.75 14.0485 21.75 11H20.25ZM17.4039 17.6748C15.7412 19.2705 13.4858 20.25 11 20.25V21.75C13.8882 21.75 16.5117 20.61 18.4425 18.7571L17.4039 17.6748ZM14 15.75C15.576 15.75 16.8915 16.8726 17.1876 18.3621L18.6588 18.0697C18.226 15.8918 16.3055 14.25 14 14.25V15.75ZM11 20.25C8.51425 20.25 6.25884 19.2705 4.59612 17.6748L3.55751 18.7571C5.48833 20.61 8.11182 21.75 11 21.75V20.25ZM4.59612 17.6748C2.84103 15.9905 1.75 13.6233 1.75 11H0.25C0.25 14.0485 1.51989 16.8016 3.55751 18.7571L4.59612 17.6748ZM8 14.25C5.69445 14.25 3.77403 15.8918 3.3412 18.0697L4.81243 18.3621C5.10846 16.8726 6.42396 15.75 8 15.75V14.25Z"
          fill="#1A2A2E"
        />
      </svg>
    );
  };

  const MyTests = () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.2178 13.0616L17.1005 12.3208H17.1005L17.2178 13.0616ZM13.0616 17.2178L12.3208 17.1005V17.1005L13.0616 17.2178ZM3.06107 18.0451L3.50191 17.4383L3.06107 18.0451ZM1.95491 16.9389L2.56168 16.4981L1.95491 16.9389ZM18.0451 16.9389L18.6518 17.3798L18.0451 16.9389ZM16.9389 18.0451L17.3798 18.6518L16.9389 18.0451ZM16.9389 1.95491L16.4981 2.56168L16.9389 1.95491ZM18.0451 3.06107L17.4383 3.50191L18.0451 3.06107ZM3.06107 1.95491L3.50191 2.56168L3.06107 1.95491ZM1.95491 3.06107L2.56168 3.50191L1.95491 3.06107ZM18.9711 13L19.7206 13.0257L18.9711 13ZM13 18.9711L13.0257 19.7206L13 18.9711ZM6 13.25C5.58579 13.25 5.25 13.5858 5.25 14C5.25 14.4142 5.58579 14.75 6 14.75V13.25ZM9 14.75C9.41421 14.75 9.75 14.4142 9.75 14C9.75 13.5858 9.41421 13.25 9 13.25V14.75ZM6 9.25C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75V9.25ZM14 10.75C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25V10.75ZM6 5.25C5.58579 5.25 5.25 5.58579 5.25 6C5.25 6.41421 5.58579 6.75 6 6.75V5.25ZM9 6.75C9.41421 6.75 9.75 6.41421 9.75 6C9.75 5.58579 9.41421 5.25 9 5.25V6.75ZM17.1005 12.3208C14.6401 12.7105 12.7105 14.6401 12.3208 17.1005L13.8023 17.3352C14.0904 15.5166 15.5166 14.0904 17.3352 13.8023L17.1005 12.3208ZM10 18.25C8.10843 18.25 6.74999 18.249 5.69804 18.135C4.66013 18.0225 4.00992 17.8074 3.50191 17.4383L2.62023 18.6518C3.42656 19.2377 4.37094 19.5 5.53648 19.6263C6.68798 19.751 8.14184 19.75 10 19.75V18.25ZM0.25 10C0.25 11.8582 0.248971 13.312 0.373728 14.4635C0.500006 15.6291 0.762324 16.5734 1.34815 17.3798L2.56168 16.4981C2.19259 15.9901 1.97745 15.3399 1.865 14.302C1.75103 13.25 1.75 11.8916 1.75 10H0.25ZM3.50191 17.4383C3.14111 17.1762 2.82382 16.8589 2.56168 16.4981L1.34815 17.3798C1.70281 17.8679 2.13209 18.2972 2.62023 18.6518L3.50191 17.4383ZM17.4383 16.4981C17.1762 16.8589 16.8589 17.1762 16.4981 17.4383L17.3798 18.6518C17.8679 18.2972 18.2972 17.8679 18.6518 17.3798L17.4383 16.4981ZM10 1.75C11.8916 1.75 13.25 1.75103 14.302 1.865C15.3399 1.97745 15.9901 2.19259 16.4981 2.56168L17.3798 1.34815C16.5734 0.762324 15.6291 0.500006 14.4635 0.373728C13.312 0.248971 11.8582 0.25 10 0.25V1.75ZM19.75 10C19.75 8.14184 19.751 6.68798 19.6263 5.53648C19.5 4.37094 19.2377 3.42656 18.6518 2.62023L17.4383 3.50191C17.8074 4.00992 18.0225 4.66013 18.135 5.69804C18.249 6.74999 18.25 8.10843 18.25 10H19.75ZM16.4981 2.56168C16.8589 2.82382 17.1762 3.14111 17.4383 3.50191L18.6518 2.62023C18.2972 2.13209 17.8679 1.70281 17.3798 1.34815L16.4981 2.56168ZM10 0.25C8.14184 0.25 6.68798 0.248971 5.53648 0.373728C4.37094 0.500006 3.42656 0.762324 2.62023 1.34815L3.50191 2.56168C4.00992 2.19259 4.66013 1.97745 5.69804 1.865C6.74999 1.75103 8.10843 1.75 10 1.75V0.25ZM1.75 10C1.75 8.10843 1.75103 6.74999 1.865 5.69804C1.97745 4.66013 2.19259 4.00992 2.56168 3.50191L1.34815 2.62023C0.762324 3.42656 0.500006 4.37094 0.373728 5.53648C0.248971 6.68798 0.25 8.14184 0.25 10H1.75ZM2.62023 1.34815C2.13209 1.70281 1.70281 2.13209 1.34815 2.62023L2.56168 3.50191C2.82382 3.14111 3.14111 2.82382 3.50191 2.56168L2.62023 1.34815ZM18.25 10C18.25 11.1731 18.2499 12.1456 18.2215 12.9743L19.7206 13.0257C19.7501 12.1658 19.75 11.1648 19.75 10H18.25ZM18.2215 12.9743C18.158 14.8292 17.9509 15.7925 17.4383 16.4981L18.6518 17.3798C19.4537 16.2761 19.6564 14.8991 19.7206 13.0257L18.2215 12.9743ZM18.9711 12.25C18.0888 12.25 17.5579 12.2484 17.1005 12.3208L17.3352 13.8023C17.647 13.7529 18.0338 13.75 18.9711 13.75L18.9711 12.25ZM10 19.75C11.1648 19.75 12.1658 19.7501 13.0257 19.7206L12.9743 18.2215C12.1456 18.2499 11.1731 18.25 10 18.25V19.75ZM13.0257 19.7206C14.8991 19.6564 16.2761 19.4537 17.3798 18.6518L16.4981 17.4383C15.7925 17.9509 14.8292 18.158 12.9743 18.2215L13.0257 19.7206ZM13.75 18.9711C13.75 18.0338 13.7529 17.647 13.8023 17.3352L12.3208 17.1005C12.2484 17.5579 12.25 18.0888 12.25 18.9711L13.75 18.9711ZM6 14.75H9V13.25H6V14.75ZM6 10.75H14V9.25H6V10.75ZM6 6.75H9V5.25H6V6.75Z"
          fill="#1A2A2E"
        />
      </svg>
    );
  };

  const Policy = () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.06107 18.0451L3.50191 17.4383L3.06107 18.0451ZM1.95491 16.9389L2.56168 16.4981L1.95491 16.9389ZM18.0451 16.9389L17.4383 16.4981L18.0451 16.9389ZM16.9389 18.0451L16.4981 17.4383L16.9389 18.0451ZM16.9389 1.95491L16.4981 2.56168L16.9389 1.95491ZM18.0451 3.06107L17.4383 3.50191L18.0451 3.06107ZM3.06107 1.95491L3.50191 2.56168H3.50191L3.06107 1.95491ZM1.95491 3.06107L2.56168 3.50191L1.95491 3.06107ZM3.13068 1.9056L2.70441 1.28851L3.13068 1.9056ZM16.8694 1.90569L17.2957 1.28862V1.28862L16.8694 1.90569ZM6 5.75C5.58579 5.75 5.25 6.08579 5.25 6.5C5.25 6.91421 5.58579 7.25 6 7.25V5.75ZM14 7.25C14.4142 7.25 14.75 6.91421 14.75 6.5C14.75 6.08579 14.4142 5.75 14 5.75V7.25ZM10 18.25C8.10843 18.25 6.74999 18.249 5.69804 18.135C4.66013 18.0225 4.00992 17.8074 3.50191 17.4383L2.62023 18.6518C3.42656 19.2377 4.37094 19.5 5.53648 19.6263C6.68798 19.751 8.14184 19.75 10 19.75V18.25ZM0.25 10C0.25 11.8582 0.248971 13.312 0.373728 14.4635C0.500006 15.6291 0.762324 16.5734 1.34815 17.3798L2.56168 16.4981C2.19259 15.9901 1.97745 15.3399 1.865 14.302C1.75103 13.25 1.75 11.8916 1.75 10H0.25ZM3.50191 17.4383C3.14111 17.1762 2.82382 16.8589 2.56168 16.4981L1.34815 17.3798C1.70281 17.8679 2.13209 18.2972 2.62023 18.6518L3.50191 17.4383ZM18.25 10C18.25 11.8916 18.249 13.25 18.135 14.302C18.0225 15.3399 17.8074 15.9901 17.4383 16.4981L18.6518 17.3798C19.2377 16.5734 19.5 15.6291 19.6263 14.4635C19.751 13.312 19.75 11.8582 19.75 10H18.25ZM10 19.75C11.8582 19.75 13.312 19.751 14.4635 19.6263C15.6291 19.5 16.5734 19.2377 17.3798 18.6518L16.4981 17.4383C15.9901 17.8074 15.3399 18.0225 14.302 18.135C13.25 18.249 11.8916 18.25 10 18.25V19.75ZM17.4383 16.4981C17.1762 16.8589 16.8589 17.1762 16.4981 17.4383L17.3798 18.6518C17.8679 18.2972 18.2972 17.8679 18.6518 17.3798L17.4383 16.4981ZM19.75 10C19.75 8.14184 19.751 6.68798 19.6263 5.53648C19.5 4.37094 19.2377 3.42656 18.6518 2.62023L17.4383 3.50191C17.8074 4.00992 18.0225 4.66013 18.135 5.69804C18.249 6.74999 18.25 8.10843 18.25 10H19.75ZM16.4981 2.56168C16.8589 2.82382 17.1762 3.14111 17.4383 3.50191L18.6518 2.62023C18.2972 2.13209 17.8679 1.70281 17.3798 1.34815L16.4981 2.56168ZM1.75 10C1.75 8.10843 1.75103 6.74999 1.865 5.69804C1.97745 4.66013 2.19259 4.00992 2.56168 3.50191L1.34815 2.62023C0.762324 3.42656 0.500006 4.37094 0.373728 5.53648C0.248971 6.68798 0.25 8.14184 0.25 10H1.75ZM2.62023 1.34815C2.13209 1.70281 1.70281 2.13209 1.34815 2.62023L2.56168 3.50191C2.82382 3.14111 3.14111 2.82382 3.50191 2.56168L2.62023 1.34815ZM10 0.25C8.1738 0.25 6.73872 0.249062 5.59818 0.367191C4.44603 0.486522 3.50714 0.734006 2.70441 1.28851L3.55694 2.52269C4.0652 2.17159 4.71896 1.96628 5.75271 1.85921C6.79808 1.75094 8.14216 1.75 10 1.75V0.25ZM2.70441 1.28851C2.67613 1.30805 2.64807 1.32793 2.62023 1.34815L3.50191 2.56168C3.52013 2.54844 3.53847 2.53545 3.55694 2.52269L2.70441 1.28851ZM10 1.75C11.8579 1.75 13.202 1.75094 14.2474 1.85922C15.2811 1.9663 15.9349 2.17163 16.4432 2.52275L17.2957 1.28862C16.493 0.734055 15.5541 0.486546 14.4019 0.367202C13.2614 0.249062 11.8263 0.25 10 0.25V1.75ZM16.4432 2.52275C16.4616 2.53549 16.4799 2.54846 16.4981 2.56168L17.3798 1.34815C17.352 1.32796 17.324 1.30812 17.2957 1.28862L16.4432 2.52275ZM6 7.25H14V5.75H6V7.25Z"
          fill="#1A2A2E"
        />
      </svg>
    );
  };

  return (
    <>
      {location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/forgotpassword" &&
      location.pathname !== "/policy" &&
      location.pathname !== "/splashscreen" &&
      location.pathname !== "/onboarding" &&
      location.pathname !== "/" ? (
        <div className="app-navigation">
          <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="Новый тест"
              value="newtest"
              icon={<TestIcon />}
              onClick={() => navigate("/starttest", { replace: true })}
            />
            <BottomNavigationAction
              label="Мои тесты"
              value="mytest"
              icon={<MyTests />}
              onClick={() => navigate("/myresults", { replace: true })}
            />
            <BottomNavigationAction
              label="Справочник"
              value="guide"
              icon={<UserIcon />}
              onClick={() => navigate("/guide", { replace: true })}
            />
            <BottomNavigationAction
              label="Профиль"
              value="profile"
              icon={<UserIcon />}
              onClick={() => navigate("/profile", { replace: true })}
            />
          </BottomNavigation>
        </div>
      ) : null}
    </>
  );
};

export default LabelBottomNavigation;

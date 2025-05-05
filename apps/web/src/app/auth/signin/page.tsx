import SignInForm from "./sign-in-form";

const SignInPage = () => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center">
			<h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
			<SignInForm />
		</div>
	);
};

export default SignInPage;

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white shadow-md mt-auto">
        <div className="container mx-auto p-4 text-center">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
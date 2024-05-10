const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-1 max-w-[500px]">
            {children}

        </div>
    </div>;
}

export default Layout
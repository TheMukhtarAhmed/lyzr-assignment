import "@/styles/globals.css";
import clsx from "clsx";

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "h-full text-foreground bg-background font-sans antialiased"
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="mx-auto md:p-10 p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

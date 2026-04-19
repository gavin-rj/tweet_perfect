export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white dark:bg-secondary-800 rounded-lg shadow-md border border-secondary-100 dark:border-secondary-700 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

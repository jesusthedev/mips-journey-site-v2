// zero-drama replacements for production debugging
export const motion = new Proxy({}, {
  get: (_, tag) => (props) => {
    const Tag = tag || 'div'
    const { children, ...rest } = props || {}
    return <Tag {...rest}>{children}</Tag>
  }
})
export const AnimatePresence = ({ children }) => children

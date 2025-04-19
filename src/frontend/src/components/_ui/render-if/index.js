function RenderIf({ condition = true, children, elseComponent = null }) {
  return condition ? children : elseComponent || null;
}

export default RenderIf;

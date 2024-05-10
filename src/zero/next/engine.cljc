(ns zero.next.engine)

(defprotocol IEngine
  (install-plugin! [eng k plugin-map])
  (patch-database! [eng patch])
  (notify! [eng event payload]))


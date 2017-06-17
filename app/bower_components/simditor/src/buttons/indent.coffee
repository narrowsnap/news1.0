
class IndentButton extends Button

  name: 'indent'

  icon: 'indent'

  _init: ->
    @title = @_t(@name) + ' (Tab)'
    super()

  status: ($node) ->
    true

  command: ->
    @editor.indentation.indent()


Simditor.Toolbar.addButton IndentButton

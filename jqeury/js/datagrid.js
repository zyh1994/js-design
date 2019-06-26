
var DataGrid = function (element, options) {
    
    this.element = $(element);
    this.options = $.extend(true, {}, this.options, options);
    this.init();
    this.bindEvent();
}
DataGrid.prototype = {
    options: {
        columnDefaults: {
            width: 100
        }
    },

    init: function () {
        var me = this,
            el = me.element,
            opts = me.options;

        me.initEl();

        me._initColumns();
        if (!opts.data) opts.data = []

        me._updateTable();

        if (opts.width) el.width(opts.width);
        if (opts.height) el.height(opts.height);

    },

    initEl: function () {
        var me = this,
            el = me.element,
            opts = me.options;
        el.addClass("ui-grid");
        me.header = $('<div class="ui-grid-header"></div>').appendTo(el);
        me.body = $('<div class="ui-grid-body"></div>').appendTo(el);


    },
    bindEvent: function () {
        var me = this,
            el = me.element,
            header = me.header;
        $(header).on("click", ".ui-grid-headercell", me.__onHeaderCellClick);
            
    },
    __onHeaderCellClick: function () {
        debugger
         alert(1)
    },
    _initColumns: function () {
        var me = this,
            el = me.element,
            opts = me.options;
        if (!opts.columns) opts.columns = []

        for (var i = 0, l = opts.columns.length; i < l; i++) {
            var column = opts.columns[i];
            opts.columns[i] = $.extend({}, opts.columnDefaults, column);
        }

    },

    _updateTable: function () {

        this._updateColumnHeader();
        this._updateRows();
    },

    _updateColumnHeader: function () {
        var me = this,
            opts = me.options,
            columns = opts.columns,
            sb = [];

        sb[sb.length] = '<table class="ui-grid-table"><tr>';

        for (var i = 0, l = columns.length; i < l; i++) {
            var column = columns[i];
            me._renderHeaderCell(sb, column, i);
        }

        sb[sb.length] = '</tr></table>';

        me.header.html(sb.join(''));
    },

    _renderHeaderCell: function (sb, column, columnIndex) {
        var me = this,
            opts = me.options,
            value = column.text;

        sb[sb.length] = '<td class="ui-grid-headercell" style="';
        sb[sb.length] = 'width:' + column.width + "px";
        sb[sb.length] = '">';

        sb[sb.length] = value;

        sb[sb.length] = '</td>';
    },

    /////////////////////////////////////////////////////////////////////

    _updateRows: function () {
        var me = this,
            opts = me.options,
            data = opts.data,
            sb = [];

        sb[sb.length] = '<table class="ui-grid-table">';

        for (var i = 0, l = data.length; i < l; i++) {
            var row = data[i];
            me._renderRow(sb, row, i);
        }

        sb[sb.length] = '</table>';

        me.body.html(sb.join(''));
    },

    _renderRow: function (sb, row, rowIndex) {
        var me = this,
            opts = me.options,
            columns = opts.columns;

        sb[sb.length] = '<tr class="ui-grid-row">';

        for (var i = 0, l = columns.length; i < l; i++) {
            var column = columns[i];
            me._renderCell(sb, row, column, rowIndex, i);
        }

        sb[sb.length] = '</tr>';
    },

    _renderCell: function (sb, row, column, rowIndex, columnIndex) {
        var me = this,
            opts = me.options,
            value = row[column.field],
            html = value;

        if (column.renderer) {
            html = column.renderer.call(me, value, row, column);
        }

        sb[sb.length] = '<td class="ui-grid-cell" style="';
        sb[sb.length] = 'width:' + column.width + "px";
        sb[sb.length] = '">';

        sb[sb.length] = html;

        sb[sb.length] = '</td>';
    },



    addRow: function (row) {
        this.options.data.push(row);
        this._updateRows();
    },

    setColumns: function (columns) {
        this.options.columns = columns;
        this._updateTable();
    },

    columns: function (value) {
        if (arguments.length == 0) {
            return this.options.columns;
        } else {
            this.options.columns = value;
            this._updateTable();
        }
    }

};

$.fn.datagrid = function (options) {
    
    var isSTR = typeof options == "string",
        args, ret;

    if (isSTR) {
        args = $.makeArray(arguments)
        args.splice(0, 1);
    }

    var name = "datagrid",
        type = DataGrid;

    var jq = this.each(function () {
        var ui = $.data(this, name);

        if (!ui) {
            ui = new type(this, options);
            $.data(this, name, ui);
        }
        if (isSTR) {
            ret = ui[options].apply(ui, args);
        }
    });

    return isSTR ? ret : jq;
};


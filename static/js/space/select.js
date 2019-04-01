$.fn.select = function () {
    if (!this.length)
        return;

    this.each(function () {
        if (this.localName != "select")
            return;

        var $this = $(this).hide();
        var select = $("<div>")
            .addClass("select")
            .click(function (e) {
                e.stopPropagation();
                
                if ($this.is("[readonly]"))
                    return;

                if (container.is(":visible")) {
                    container.hide();
                    return;
                }

                $(".select-menu").hide();
                container.show();
            });
        var id = $this.data("id");
        if (id)
            select.attr("id", id);
        $this.after(select);

        var value = $("<div>").addClass("select-name").appendTo(select);
        var container = $("<div>").addClass("select-menu").hide().appendTo(select);

        var selectedIndex = this.selectedIndex;
        $this.children().each(function (i) {
            if (this.localName != "option")
                return;

            if (selectedIndex == i) {
                value.text(this.textContent);

                if (this.disabled) {
                    value.addClass("placeholder");
                    return;
                }
            }

            if (this.disabled)
                return;

            var text = $(this).text();
            $("<div>")
                .addClass("option")
                .data("index", i)
                .attr("title", text)
                .text(text)
                .click(function (e) {
                    e.stopPropagation();

                    container.hide();

                    value.removeClass("placeholder").text(text);

                    $this.prop("selectedIndex", i);
                    $this.change();
                })
                .appendTo(container);
        })
    });
}

$(document).on("click", function () {
    $(".select-menu").hide();
});

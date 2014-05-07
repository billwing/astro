<div class="{{classPrefix}}">
    <ul class="{{classPrefix}}-ctn" data-role="items">
        {{#each items}}
            <li data-role="item" class="{{../classPrefix}}-item" data-value="{{code}}">{{highlightItem ../classPrefix matchKey}}</li>
        {{/each}}
    </ul>
</div>

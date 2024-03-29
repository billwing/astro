define("tpl/address/1.0.0/address", ["$", "widget"], function(require, exports, module) {

	var $ = require('$');
    var Widget = require('widget');

    // Address
    // -----------
    // 省市区地址组件，核心特征是：省市区联动选择

    var areaList = {'上海':{'上海市':['其它区','南汇区','卢湾区','嘉定区','奉贤区','宝山区','崇明县','川沙区','徐汇区','普陀区','杨浦区','松江区','浦东新区','虹口区','金山区','长宁区','闵行区','闸北区','青浦区','静安区','黄浦区']},'云南省':{'临沧市':['临翔区','云县','其它区','凤庆县','双江拉祜族佤族布朗族傣族自治县','永德县','沧源佤族自治县','耿马傣族佤族自治县','镇康县'],'丽江市':['其它区','华坪县','古城区','宁蒗彝族自治县','永胜县','玉龙纳西族自治县'],'保山市':['其它区','施甸县','昌宁县','腾冲县','隆阳区','龙陵县'],'大理白族自治州':['云龙县','其它区','剑川县','南涧彝族自治县','大理市','宾川县','巍山彝族回族自治县','弥渡县','永平县','洱源县','漾濞彝族自治县','祥云县','鹤庆县'],'德宏傣族景颇族自治州':['其它区','梁河县','潞西市','瑞丽市','盈江县','陇川县'],'怒江傈僳族自治州':['兰坪白族普米族自治县','其它区','泸水县','福贡县','贡山独龙族怒族自治县'],'文山壮族苗族自治州':['丘北县','其它区','富宁县','广南县','文山县','砚山县','西畴县','马关县','麻栗坡县'],'昆明市':['东川区','五华区','其它区','呈贡县','安宁市','官渡区','宜良县','富民县','寻甸回族彝族自治县','嵩明县','晋宁县','盘龙区','石林彝族自治县','禄劝彝族苗族自治县','西山区'],'昭通市':['其它区','大关县','威信县','巧家县','彝良县','昭阳区','水富县','永善县','盐津县','绥江县','镇雄县','鲁甸县'],'普洱市':['其它区','墨江哈尼族自治县','孟连傣族拉祜族佤族自治县','宁洱哈尼族彝族自治县','思茅区','景东彝族自治县','景谷傣族彝族自治县','江城哈尼族彝族自治县','澜沧拉祜族自治县','西盟佤族自治县','镇沅彝族哈尼族拉祜族自治县'],'曲靖市':['会泽县','其它区','宣威市','富源县','师宗县','沾益县','罗平县','陆良县','马龙县','麒麟区'],'楚雄彝族自治州':['元谋县','其它区','南华县','双柏县','大姚县','姚安县','楚雄市','武定县','永仁县','牟定县','禄丰县'],'玉溪市':['元江哈尼族彝族傣族自治县','其它区','华宁县','峨山彝族自治县','新平彝族傣族自治县','易门县','江川县','澄江县','红塔区','通海县'],'红河哈尼族彝族自治州':['个旧市','元阳县','其它区','屏边苗族自治县','建水县','开远市','弥勒县','河口瑶族自治县','泸西县','石屏县','红河县','绿春县','蒙自县','金平苗族瑶族傣族自治县'],'西双版纳傣族自治州':['其它区','勐海县','勐腊县','景洪市'],'迪庆藏族自治州':['其它区','德钦县','维西傈僳族自治县','香格里拉县']},'内蒙古自治区':{'乌兰察布市':['丰镇市','兴和县','其它区','凉城县','化德县','卓资县','商都县','四子王旗','察哈尔右翼中旗','察哈尔右翼前旗','察哈尔右翼后旗','集宁区'],'乌海市':['乌达区','其它区','海勃湾区','海南区'],'兴安盟':['乌兰浩特市','其它区','扎赉特旗','科尔沁右翼中旗','科尔沁右翼前旗','突泉县','阿尔山市'],'包头市':['东河区','九原区','其它区','固阳县','土默特右旗','昆都仑区','白云矿区','石拐区','达尔罕茂明安联合旗','青山区'],'呼伦贝尔市':['其它区','扎兰屯市','新巴尔虎右旗','新巴尔虎左旗','根河市','海拉尔区','满洲里市','牙克石市','莫力达瓦达斡尔族自治旗','鄂伦春自治旗','鄂温克族自治旗','阿荣旗','陈巴尔虎旗','额尔古纳市'],'呼和浩特市':['其它区','和林格尔县','回民区','土默特左旗','托克托县','新城区','武川县','清水河县','玉泉区','赛罕区'],'巴彦淖尔市':['临河区','乌拉特中旗','乌拉特前旗','乌拉特后旗','五原县','其它区','杭锦后旗','磴口县'],'赤峰市':['元宝山区','克什克腾旗','其它区','喀喇沁旗','宁城县','巴林右旗','巴林左旗','敖汉旗','松山区','林西县','红山区','翁牛特旗','阿鲁科尔沁旗'],'通辽市':['其它区','奈曼旗','库伦旗','开鲁县','扎鲁特旗','科尔沁区','科尔沁左翼中旗','科尔沁左翼后旗','霍林郭勒市'],'鄂尔多斯市':['东胜区','乌审旗','伊金霍洛旗','其它区','准格尔旗','杭锦旗','达拉特旗','鄂托克前旗','鄂托克旗'],'锡林郭勒盟':['东乌珠穆沁旗','二连浩特市','其它区','多伦县','太仆寺旗','正蓝旗','正镶白旗','苏尼特右旗','苏尼特左旗','西乌珠穆沁旗','锡林浩特市','镶黄旗','阿巴嘎旗'],'阿拉善盟':['其它区','阿拉善右旗','阿拉善左旗','额济纳旗']},'北京':{'北京市':['东城区','丰台区','其它区','大兴区','宣武区','密云县','崇文区','平谷区','延庆县','怀柔区','房山区','昌平区','朝阳区','海淀区','石景山区','西城区','通州区','门头沟区','顺义区']},'台湾省':{'云林县':[],'南投县':[],'台东县':[],'台中市':['东区','中区','其它区','北区','北屯区','南区','南屯区','西区','西屯区'],'台北市':['万华区','中山区','中正区','信义区','其它区','内湖区','北投区','南港区','士林区','大同区','大安区','文山区','松山区'],'台南市':['东区','中西区','其它区','北区','南区','安南区','安平区'],'嘉义县':[],'嘉义市':['东区','其它区','西区'],'基隆市':['七堵区','中山区','中正区','仁爱区','信义区','其它区','安乐区','暖暖区'],'宜兰县':[],'屏东县':[],'彰化县':[],'新北市':[],'新竹县':[],'新竹市':['东区','其它区','北区','香山区'],'桃园县':[],'澎湖县':[],'花莲县':[],'苗栗县':[],'金门县':[],'高雄市':['三民区','其它区','前金区','前镇区','小港区','左营区','新兴区','旗津区','楠梓区','盐埕区','芩雅区','鼓山区']},'吉林省':{'吉林市':['丰满区','其它区','昌邑区','桦甸市','永吉县','磐石市','舒兰市','船营区','蛟河市','龙潭区'],'四平市':['伊通满族自治县','公主岭市','其它区','双辽市','梨树县','铁东区','铁西区'],'延边朝鲜族自治州':['其它区','和龙市','图们市','安图县','延吉市','敦化市','汪清县','珲春市','龙井市'],'松原市':['乾安县','其它区','前郭尔罗斯蒙古族自治县','宁江区','扶余县','长岭县'],'白城市':['其它区','大安市','洮北区','洮南市','通榆县','镇赉县'],'白山市':['临江市','八道江区','其它区','抚松县','江源县','长白朝鲜族自治县','靖宇县'],'辽源市':['东丰县','东辽县','其它区','西安区','龙山区'],'通化市':['东昌区','二道江区','其它区','柳河县','梅河口市','辉南县','通化县','集安市'],'长春市':['九台市','二道区','其它区','农安县','净月旅游开发区','南关区','双阳区','宽城区','德惠市','朝阳区','榆树市','汽车产业开发区','经济技术开发区','绿园区','高新技术产业开发区']},'四川省':{'乐山市':['五通桥区','井研县','其它区','夹江县','峨眉山市','峨边彝族自治县','市中区','沐川县','沙湾区','犍为县','金口河区','马边彝族自治县'],'内江市':['东兴区','其它区','威远县','市中区','资中县','隆昌县'],'凉山彝族自治州':['会东县','会理县','其它区','冕宁县','喜德县','宁南县','布拖县','德昌县','昭觉县','普格县','木里藏族自治县','甘洛县','盐源县','美姑县','西昌市','越西县','金阳县','雷波县'],'南充市':['仪陇县','其它区','南部县','嘉陵区','营山县','蓬安县','西充县','阆中市','顺庆区','高坪区'],'宜宾市':['兴文县','其它区','南溪县','宜宾县','屏山县','江安县','珙县','筠连县','翠屏区','长宁县','高县'],'巴中市':['其它区','南江县','巴州区','平昌县','通江县'],'广元市':['元坝区','其它区','利州区','剑阁县','旺苍县','朝天区','苍溪县','青川县'],'广安市':['其它区','华蓥市','岳池县','市辖区','广安区','武胜县','邻水县'],'德阳市':['中江县','什邡市','其它区','广汉市','旌阳区','绵竹市','罗江县'],'成都市':['其它区','双流县','大邑县','崇州市','彭州市','成华区','新津县','新都区','武侯区','温江区','蒲江县','邛崃市','郫县','都江堰市','金堂县','金牛区','锦江区','青白江区','青羊区','龙泉驿区'],'攀枝花市':['东区','仁和区','其它区','盐边县','米易县','西区'],'泸州市':['其它区','叙永县','古蔺县','合江县','江阳区','泸县','纳溪区','龙马潭区'],'甘孜藏族自治州':['丹巴县','九龙县','乡城县','其它区','巴塘县','康定县','得荣县','德格县','新龙县','泸定县','炉霍县','理塘县','甘孜县','白玉县','石渠县','稻城县','色达县','道孚县','雅江县'],'眉山市':['东坡区','丹棱县','仁寿县','其它区','彭山县','洪雅县','青神县'],'绵阳市':['三台县','其它区','北川羌族自治县','安县','平武县','梓潼县','江油市','涪城区','游仙区','盐亭县','高新区'],'自贡市':['其它区','大安区','富顺县','沿滩区','自流井区','荣县','贡井区'],'资阳市':['乐至县','其它区','安岳县','简阳市','雁江区'],'达州市':['万源市','其它区','大竹县','宣汉县','开江县','渠县','达县','通川区'],'遂宁市':['其它区','大英县','安居区','射洪县','船山区','蓬溪县'],'阿坝藏族羌族自治州':['九寨沟县','其它区','壤塘县','小金县','松潘县','汶川县','理县','红原县','若尔盖县','茂县','金川县','阿坝县','马尔康县','黑水县'],'雅安市':['其它区','名山县','天全县','宝兴县','汉源县','石棉县','芦山县','荥经县','雨城区']},'天津':{'天津市':['东丽区','其它区','北辰区','南开区','和平区','塘沽区','大港区','宁河县','宝坻区','武清区','汉沽区','河东区','河北区','河西区','津南区','滨海新区','红桥区','蓟县','西青区','静海县']},'宁夏回族自治区':{'中卫市':['中宁县','其它区','沙坡头区','海原县'],'吴忠市':['其它区','利通区','同心县','盐池县','红寺堡区','青铜峡市'],'固原市':['其它区','原州区','彭阳县','泾源县','西吉县','隆德县'],'石嘴山市':['其它区','大武口区','平罗县','惠农区'],'银川市':['兴庆区','其它区','永宁县','灵武市','西夏区','贺兰县','金凤区']},'安徽省':{'亳州市':['其它区','利辛县','涡阳县','蒙城县','谯城区'],'六安市':['其它区','寿县','舒城县','裕安区','金安区','金寨县','霍山县','霍邱县'],'合肥市':['中区','其它区','包河区','居巢区','巢湖市','庐江县','庐阳区','瑶海区','肥东县','肥西县','蜀山区','长丰县','高新区'],'安庆市':['其它区','大观区','太湖县','宜秀区','宿松县','岳西县','怀宁县','望江县','枞阳县','桐城市','潜山县','迎江区'],'宣城市':['其它区','宁国市','宣州区','广德县','旌德县','泾县','绩溪县','郎溪县'],'宿州市':['其它区','埇桥区','泗县','灵璧县','砀山县','萧县'],'池州市':['东至县','其它区','石台县','贵池区','青阳县'],'淮北市':['其它区','杜集区','濉溪县','烈山区','相山区'],'淮南市':['八公山区','其它区','凤台县','大通区','潘集区','田家庵区','谢家集区'],'滁州市':['全椒县','其它区','凤阳县','南谯区','天长市','定远县','明光市','来安县','琅琊区'],'芜湖市':['三山区','其它区','南陵县','弋江区','无为县','繁昌县','芜湖县','镜湖区','鸠江区'],'蚌埠市':['五河县','其它区','固镇县','怀远县','淮上区','禹会区','蚌山区','龙子湖区'],'铜陵市':['其它区','狮子山区','郊区','铜官山区','铜陵县'],'阜阳市':['临泉县','其它区','太和县','界首市','阜南县','颍上县','颍东区','颍州区','颍泉区'],'马鞍山市':['其它区','含山县','和县','当涂县','花山区','金家庄区','雨山区'],'黄山市':['休宁县','其它区','屯溪区','徽州区','歙县','祁门县','黄山区','黟县']},'山东省':{'东营市':['东城区','东营区','其它区','利津县','垦利县','广饶县','河口区','西城区'],'临沂市':['临沭县','兰山区','其它区','平邑县','沂南县','沂水县','河东区','罗庄区','苍山县','莒南县','蒙阴县','费县','郯城县'],'威海市':['乳山市','其它区','文登市','环翠区','荣成市'],'德州市':['临邑县','乐陵市','其它区','夏津县','宁津县','平原县','庆云县','开发区','德城区','武城县','禹城市','陵县','齐河县'],'日照市':['东港区','五莲县','其它区','岚山区','莒县'],'枣庄市':['其它区','台儿庄区','山亭区','峄城区','市中区','滕州市','薛城区'],'泰安市':['东平县','其它区','宁阳县','岱岳区','新泰市','泰山区','肥城市'],'济南市':['其它区','历下区','历城区','商河县','天桥区','市中区','平阴县','槐荫区','济阳县','章丘市','长清区'],'济宁市':['任城区','兖州市','其它区','嘉祥县','市中区','微山县','曲阜市','梁山县','汶上县','泗水县','邹城市','金乡县','鱼台县'],'淄博市':['临淄区','其它区','博山区','周村区','张店区','桓台县','沂源县','淄川区','高青县'],'滨州市':['其它区','博兴县','惠民县','无棣县','沾化县','滨城区','邹平县','阳信县'],'潍坊市':['临朐县','其它区','坊子区','奎文区','安丘市','寒亭区','寿光市','开发区','昌乐县','昌邑市','潍城区','诸城市','青州市','高密市'],'烟台市':['其它区','招远市','栖霞市','海阳市','牟平区','福山区','芝罘区','莱山区','莱州市','莱阳市','蓬莱市','长岛县','龙口市'],'聊城市':['东昌府区','东阿县','临清市','其它区','冠县','茌平县','莘县','阳谷县','高唐县'],'莱芜市':['其它区','莱城区','钢城区'],'菏泽市':['东明县','其它区','单县','定陶县','巨野县','成武县','曹县','牡丹区','郓城县','鄄城县'],'青岛市':['其它区','即墨市','四方区','城阳区','崂山区','市北区','市南区','平度市','开发区','李沧区','胶南市','胶州市','莱西市','黄岛区']},'山西省':{'临汾市':['乡宁县','侯马市','其它区','古县','吉县','大宁县','安泽县','尧都区','曲沃县','永和县','汾西县','洪洞县','浮山县','翼城县','蒲县','襄汾县','隰县','霍州市'],'吕梁市':['中阳县','临县','交口县','交城县','兴县','其它区','孝义市','岚县','文水县','方山县','柳林县','汾阳市','石楼县','离石区'],'大同市':['其它区','南郊区','城区','大同县','天镇县','左云县','广灵县','新荣区','浑源县','灵丘县','矿区','阳高县'],'太原市':['万柏林区','其它区','古交市','娄烦县','小店区','尖草坪区','晋源区','杏花岭区','清徐县','迎泽区','阳曲县'],'忻州市':['五台县','五寨县','代县','保德县','偏关县','其它区','原平市','宁武县','定襄县','岢岚县','忻府区','河曲县','神池县','繁峙县','静乐县'],'晋中市':['介休市','其它区','和顺县','太谷县','寿阳县','左权县','平遥县','昔阳县','榆次区','榆社县','灵石县','祁县'],'晋城市':['其它区','城区','沁水县','泽州县','阳城县','陵川县','高平市'],'朔州市':['其它区','右玉县','山阴县','平鲁区','应县','怀仁县','朔城区'],'运城市':['万荣县','临猗县','其它区','垣曲县','夏县','平陆县','新绛县','永济市','河津市','盐湖区','稷山县','绛县','芮城县','闻喜县'],'长治市':['其它区','城区','壶关县','屯留县','平顺县','武乡县','沁县','沁源县','潞城市','襄垣县','郊区','长子县','长治县','高新区','黎城县'],'阳泉市':['其它区','城区','平定县','盂县','矿区','郊区']},'广东省':{'东莞市':['万江区','东坑镇','东城区','中堂镇','企石镇','凤岗镇','南城区','厚街镇','塘厦镇','大岭山镇','大朗镇','寮步镇','常平镇','望牛墩镇','桥头镇','樟木头镇','横沥镇','沙田镇','洪梅镇','清溪镇','石排镇','石碣镇','石龙镇','茶山镇','莞城区','虎门镇','谢岗镇','道滘镇','长安镇','高埗镇','麻涌镇','黄江镇'],'中山市':['三乡镇','三角镇','东凤镇','东区','东升镇','五桂山区','南区','南头镇','古镇镇','坦洲镇','大涌镇','小榄镇','板芙镇','横栏镇','民众镇','沙溪镇','港口镇','火炬开发区','石岐区','西区','阜沙镇','黄圃镇'],'云浮市':['云城区','云安县','其它区','新兴县','罗定市','郁南县'],'佛山市':['三水区','其它区','南海区','禅城区','顺德区','高明区'],'广州市':['东山区','从化市','其它区','南沙区','增城市','天河区','海珠区','番禺区','白云区','花都区','荔湾区','萝岗区','越秀区','黄埔区'],'惠州市':['其它区','博罗县','惠东县','惠城区','惠阳区','龙门县'],'揭阳市':['东山区','其它区','惠来县','揭东县','揭西县','普宁市','榕城区'],'梅州市':['丰顺县','五华县','兴宁市','其它区','大埔县','平远县','梅县','梅江区','蕉岭县'],'汕头市':['其它区','南澳县','潮南区','潮阳区','澄海区','濠江区','金平区','龙湖区'],'汕尾市':['其它区','城区','海丰县','陆丰市','陆河县'],'江门市':['其它区','台山市','开平市','恩平市','新会区','江海区','蓬江区','鹤山市'],'河源市':['东源县','其它区','和平县','源城区','紫金县','连平县','龙川县'],'深圳市':['光明新区','其它区','南山区','坪山新区','宝安区','盐田区','福田区','罗湖区','龙华新区','龙岗区'],'清远市':['佛冈县','其它区','清城区','清新县','英德市','连南瑶族自治县','连山壮族瑶族自治县','连州市','阳山县'],'湛江市':['其它区','吴川市','坡头区','廉江市','徐闻县','赤坎区','遂溪县','雷州市','霞山区','麻章区'],'潮州市':['其它区','枫溪区','湘桥区','潮安县','饶平县'],'珠海市':['其它区','南湾区','斗门区','金唐区','金湾区','香洲区'],'肇庆市':['其它区','四会市','封开县','广宁县','德庆县','怀集县','端州区','高要市','鼎湖区'],'茂名市':['信宜市','其它区','化州市','电白县','茂南区','茂港区','高州市'],'阳江市':['其它区','江城区','阳东县','阳春市','阳西县'],'韶关市':['乐昌市','乳源瑶族自治县','仁化县','其它区','南雄市','始兴县','新丰县','曲江区','武江区','浈江区','翁源县']},'广西壮族自治区':{'北海市':['其它区','合浦县','海城区','铁山港区','银海区'],'南宁市':['上林县','兴宁区','其它区','宾阳县','横县','武鸣县','江南区','良庆区','西乡塘区','邕宁区','隆安县','青秀区','马山县'],'崇左市':['其它区','凭祥市','大新县','天等县','宁明县','扶绥县','江州区','龙州县'],'来宾市':['兴宾区','其它区','合山市','忻城县','武宣县','象州县','金秀瑶族自治县'],'柳州市':['三江侗族自治县','其它区','城中区','柳北区','柳南区','柳城县','柳江县','融安县','融水苗族自治县','鱼峰区','鹿寨县'],'桂林市':['七星区','临桂县','全州县','兴安县','其它区','叠彩区','平乐县','恭城瑶族自治县','永福县','灌阳县','灵川县','秀峰区','荔浦县','象山区','资源县','阳朔县','雁山区','龙胜各族自治县'],'梧州市':['万秀区','其它区','岑溪市','苍梧县','蒙山县','藤县','蝶山区','长洲区'],'河池市':['东兰县','其它区','凤山县','南丹县','大化瑶族自治县','天峨县','宜州市','巴马瑶族自治县','环江毛南族自治县','罗城仫佬族自治县','都安瑶族自治县','金城江区'],'玉林市':['兴业县','其它区','北流市','博白县','容县','玉州区','陆川县'],'百色市':['乐业县','其它区','凌云县','右江区','平果县','德保县','田东县','田林县','田阳县','西林县','那坡县','隆林各族自治县','靖西县'],'贵港市':['其它区','平南县','桂平市','港北区','港南区','覃塘区'],'贺州市':['八步区','其它区','富川瑶族自治县','昭平县','钟山县'],'钦州市':['其它区','浦北县','灵山县','钦北区','钦南区'],'防城港市':['上思县','东兴市','其它区','港口区','防城区']},'新疆维吾尔自治区':{'乌鲁木齐市':['东山区','乌鲁木齐县','其它区','天山区','头屯河区','新市区','水磨沟区','沙依巴克区','米东区','达坂城区'],'五家渠市':[],'伊犁哈萨克自治州':['伊宁县','伊宁市','其它区','奎屯市','察布查尔锡伯自治县','尼勒克县','巩留县','新源县','昭苏县','特克斯县','霍城县'],'克孜勒苏柯尔克孜自治州':['乌恰县','其它区','阿克陶县','阿合奇县','阿图什市'],'克拉玛依市':['乌尔禾区','克拉玛依区','其它区','独山子区','白碱滩区'],'博尔塔拉蒙古自治州':['其它区','博乐市','温泉县','精河县'],'吐鲁番地区':['其它区','吐鲁番市','托克逊县','鄯善县'],'和田地区':['于田县','其它区','和田县','和田市','墨玉县','民丰县','洛浦县','皮山县','策勒县'],'哈密地区':['伊吾县','其它区','哈密市','巴里坤哈萨克自治县'],'喀什地区':['伽师县','其它区','叶城县','喀什市','塔什库尔干塔吉克自治县','岳普湖县','巴楚县','泽普县','疏勒县','疏附县','英吉沙县','莎车县','麦盖提县'],'图木舒克市':[],'塔城地区':['乌苏市','其它区','和布克赛尔蒙古自治县','塔城市','托里县','沙湾县','裕民县','额敏县'],'巴音郭楞蒙古自治州':['且末县','其它区','博湖县','和硕县','和静县','尉犁县','库尔勒市','焉耆回族自治县','若羌县','轮台县'],'昌吉回族自治州':['其它区','吉木萨尔县','呼图壁县','奇台县','昌吉市','木垒哈萨克自治县','玛纳斯县','米泉市','阜康市'],'石河子市':[],'阿克苏地区':['乌什县','其它区','库车县','拜城县','新和县','柯坪县','沙雅县','温宿县','阿克苏市','阿瓦提县'],'阿勒泰地区':['其它区','吉木乃县','哈巴河县','富蕴县','布尔津县','福海县','阿勒泰市','青河县'],'阿拉尔市':[]},'江苏省':{'南京市':['下关区','六合区','其它区','建邺区','栖霞区','江宁区','浦口区','溧水县','玄武区','白下区','秦淮区','雨花台区','高淳县','鼓楼区'],'南通市':['其它区','启东市','如东县','如皋市','崇川区','开发区','海安县','海门市','港闸区','通州区','通州市'],'宿迁市':['其它区','宿城区','宿豫区','沭阳县','泗洪县','泗阳县'],'常州市':['其它区','天宁区','戚墅堰区','新北区','武进区','溧阳市','金坛市','钟楼区'],'徐州市':['丰县','九里区','云龙区','其它区','新沂市','沛县','泉山区','睢宁县','贾汪区','邳州市','铜山县','鼓楼区'],'扬州市':['仪征市','其它区','宝应县','广陵区','江都市','经济开发区','维扬区','邗江区','高邮市'],'无锡市':['其它区','北塘区','南长区','宜兴市','崇安区','惠山区','新区','江阴市','滨湖区','锡山区'],'泰州市':['兴化市','其它区','姜堰市','泰兴市','海陵区','靖江市','高港区'],'淮安市':['其它区','楚州区','洪泽县','涟水县','淮阴区','清河区','清浦区','盱眙县','金湖县'],'盐城市':['东台市','亭湖区','其它区','响水县','大丰市','射阳县','建湖县','滨海县','盐都区','阜宁县'],'苏州市':['其它区','吴中区','吴江市','园区','太仓市','常熟市','平江区','张家港市','新区','昆山市','沧浪区','相城区','虎丘区','金阊区'],'连云港市':['东海县','其它区','新浦区','海州区','灌云县','灌南县','赣榆县','连云区'],'镇江市':['丹徒区','丹阳市','京口区','其它区','句容市','扬中市','润州区']},'江西省':{'上饶市':['万年县','上饶县','余干县','信州区','其它区','婺源县','广丰县','弋阳县','德兴市','横峰县','玉山县','鄱阳县','铅山县'],'九江市':['九江县','修水县','其它区','庐山区','彭泽县','德安县','星子县','武宁县','永修县','浔阳区','湖口县','瑞昌市','都昌县'],'南昌市':['东湖区','其它区','南昌县','安义县','新建县','昌北区','湾里区','红谷滩新区','经济技术开发区','西湖区','进贤县','青云谱区','青山湖区'],'吉安市':['万安县','井冈山市','其它区','吉安县','吉州区','吉水县','安福县','峡江县','新干县','永丰县','永新县','泰和县','遂川县','青原区'],'宜春市':['万载县','上高县','丰城市','其它区','奉新县','宜丰县','樟树市','袁州区','铜鼓县','靖安县','高安市'],'抚州市':['东乡县','临川区','乐安县','其它区','南丰县','南城县','宜黄县','崇仁县','广昌县','资溪县','金溪县','黎川县'],'新余市':['其它区','分宜县','渝水区'],'景德镇市':['乐平市','其它区','昌江区','浮梁县','珠山区'],'萍乡市':['上栗县','其它区','安源区','湘东区','芦溪县','莲花县'],'赣州市':['上犹县','于都县','会昌县','信丰县','全南县','兴国县','其它区','南康市','大余县','宁都县','安远县','定南县','寻乌县','崇义县','瑞金市','石城县','章贡区','赣县','黄金区','龙南县'],'鹰潭市':['余江县','其它区','月湖区','贵溪市']},'河北省':{'保定市':['其它区','北市区','南市区','博野县','唐县','安国市','安新县','定兴县','定州市','容城县','徐水县','新市区','易县','曲阳县','望都县','涞水县','涞源县','涿州市','清苑县','满城县','蠡县','阜平县','雄县','顺平县','高开区','高碑店市','高阳县'],'唐山市':['丰南区','丰润区','乐亭县','其它区','古冶区','唐海县','开平区','滦南县','滦县','玉田县','路北区','路南区','迁安市','迁西县','遵化市'],'廊坊市':['三河市','其它区','固安县','大厂回族自治县','大城县','安次区','广阳区','开发区','文安县','永清县','燕郊经济技术开发区','霸州市','香河县'],'张家口市':['万全县','下花园区','其它区','宣化区','宣化县','尚义县','崇礼县','康保县','张北县','怀安县','怀来县','桥东区','桥西区','沽源县','涿鹿县','蔚县','赤城县','阳原县'],'承德市':['丰宁满族自治县','兴隆县','其它区','双桥区','双滦区','围场满族蒙古族自治县','宽城满族自治县','平泉县','承德县','滦平县','隆化县','鹰手营子矿区'],'沧州市':['东光县','任丘市','其它区','南皮县','吴桥县','孟村回族自治县','新华区','沧县','河间市','泊头市','海兴县','献县','盐山县','肃宁县','运河区','青县','黄骅市'],'石家庄市':['井陉县','井陉矿区','元氏县','其它区','平山县','新乐市','新华区','无极县','晋州市','栾城县','桥东区','桥西区','正定县','深泽县','灵寿县','藁城市','行唐县','裕华区','赞皇县','赵县','辛集市','长安区','高邑县','鹿泉市'],'秦皇岛市':['其它区','北戴河区','卢龙县','山海关区','抚宁县','昌黎县','海港区','经济技术开发区','青龙满族自治县'],'衡水市':['其它区','冀州市','安平县','故城县','景县','枣强县','桃城区','武强县','武邑县','深州市','阜城县','饶阳县'],'邢台市':['临城县','临西县','任县','其它区','内丘县','南和县','南宫市','威县','宁晋县','巨鹿县','平乡县','广宗县','新河县','柏乡县','桥东区','桥西区','沙河市','清河县','邢台县','隆尧县'],'邯郸市':['丛台区','临漳县','其它区','复兴区','大名县','峰峰矿区','广平县','成安县','曲周县','武安市','永年县','涉县','磁县','肥乡县','邯山区','邯郸县','邱县','馆陶县','魏县','鸡泽县']},'河南省':{'三门峡市':['义马市','其它区','卢氏县','渑池县','湖滨区','灵宝市','陕县'],'信阳市':['光山县','其它区','商城县','固始县','平桥区','息县','新县','浉河区','淮滨县','潢川县','罗山县'],'南阳市':['其它区','内乡县','南召县','卧龙区','唐河县','宛城区','新野县','方城县','桐柏县','淅川县','社旗县','西峡县','邓州市','镇平县'],'周口市':['其它区','商水县','太康县','川汇区','扶沟县','沈丘县','淮阳县','西华县','郸城县','项城市','鹿邑县'],'商丘市':['其它区','夏邑县','宁陵县','柘城县','梁园区','民权县','永城市','睢县','睢阳区','虞城县'],'安阳市':['其它区','内黄县','北关区','安阳县','文峰区','林州市','殷都区','汤阴县','滑县','龙安区'],'平顶山市':['其它区','卫东区','叶县','宝丰县','新华区','汝州市','湛河区','石龙区','舞钢市','郏县','鲁山县'],'开封市':['兰考县','其它区','尉氏县','开封县','杞县','禹王台区','通许县','金明区','顺河回族区','鼓楼区','龙亭区'],'新乡市':['其它区','凤泉区','卫滨区','卫辉市','原阳县','封丘县','延津县','新乡县','牧野区','红旗区','获嘉县','辉县市','长垣县'],'洛阳市':['伊川县','偃师市','其它区','吉利区','孟津县','宜阳县','嵩县','廛河回族区','新安县','栾川县','汝阳县','洛宁县','洛龙区','涧西区','老城区','西工区','高新区'],'济源市':[],'漯河市':['临颍县','其它区','召陵区','源汇区','舞阳县','郾城区'],'濮阳市':['其它区','华龙区','南乐县','台前县','清丰县','濮阳县','范县'],'焦作市':['中站区','修武县','其它区','博爱县','孟州市','山阳区','武陟县','沁阳市','温县','解放区','马村区'],'许昌市':['其它区','禹州市','襄城县','许昌县','鄢陵县','长葛市','魏都区'],'郑州市':['上街区','中原区','中牟县','二七区','其它区','巩义市','惠济区','新密市','新郑市','登封市','管城回族区','荥阳市','郑东新区','金水区','高新区'],'驻马店市':['上蔡县','其它区','平舆县','新蔡县','正阳县','汝南县','泌阳县','确山县','西平县','遂平县','驿城区'],'鹤壁市':['其它区','山城区','浚县','淇县','淇滨区','鹤山区']},'浙江省':{'丽水市':['云和县','其它区','庆元县','景宁畲族自治县','松阳县','缙云县','莲都区','遂昌县','青田县','龙泉市'],'台州市':['三门县','临海市','仙居县','其它区','天台县','椒江区','温岭市','玉环县','路桥区','黄岩区'],'嘉兴市':['其它区','南湖区','嘉善县','平湖市','桐乡市','海宁市','海盐县','秀洲区'],'宁波市':['余姚市','其它区','北仑区','奉化市','宁海县','慈溪市','江东区','江北区','海曙区','象山县','鄞州区','镇海区'],'杭州市':['上城区','下城区','临安市','余杭区','其它区','富阳市','建德市','拱墅区','桐庐县','江干区','淳安县','滨江区','萧山区','西湖区'],'温州市':['乐清市','其它区','平阳县','文成县','永嘉县','泰顺县','洞头县','瑞安市','瓯海区','苍南县','鹿城区','龙湾区'],'湖州市':['其它区','南浔区','吴兴区','安吉县','德清县','长兴县'],'绍兴市':['上虞市','其它区','嵊州市','新昌县','绍兴县','诸暨市','越城区'],'舟山市':['其它区','定海区','岱山县','嵊泗县','普陀区'],'衢州市':['其它区','常山县','开化县','柯城区','江山市','衢江区','龙游县'],'金华市':['东阳市','义乌市','兰溪市','其它区','婺城区','武义县','永康市','浦江县','磐安县','金东区']},'海南省':{'万宁市':[],'三亚市':[],'东方市':[],'中沙群岛的岛礁及其海域':[],'临高县':[],'乐东黎族自治县':[],'五指山市':[],'保亭黎族苗族自治县':[],'儋州市':[],'南沙群岛':[],'定安县':[],'屯昌县':[],'文昌市':[],'昌江黎族自治县':[],'海口市':['其它区','琼山区','秀英区','美兰区','龙华区'],'澄迈县':[],'琼中黎族苗族自治县':[],'琼海市':[],'白沙黎族自治县':[],'西沙群岛':[],'陵水黎族自治县':[]},'海外':{'海外':[]},'湖北省':{'仙桃市':[],'十堰市':['丹江口市','其它区','城区','张湾区','房县','竹山县','竹溪县','茅箭区','郧县','郧西县'],'咸宁市':['其它区','咸安区','嘉鱼县','崇阳县','温泉城区','赤壁市','通城县','通山县'],'天门市':[],'孝感市':['云梦县','其它区','大悟县','孝南区','孝昌县','安陆市','应城市','汉川市'],'宜昌市':['五峰土家族自治县','伍家岗区','兴山县','其它区','夷陵区','宜都市','开发区','当阳市','枝江市','点军区','猇亭区','秭归县','葛洲坝区','西陵区','远安县','长阳土家族自治县'],'恩施土家族苗族自治州':['其它区','利川市','咸丰县','宣恩县','巴东县','建始县','恩施市','来凤县','鹤峰县'],'武汉市':['东西湖区','其它区','新洲区','武昌区','汉南区','汉阳区','江夏区','江岸区','江汉区','洪山区','硚口区','蔡甸区','青山区','黄陂区'],'潜江市':[],'神农架林区':[],'荆州市':['公安县','其它区','松滋市','江陵县','沙市区','洪湖市','监利县','石首市','荆州区'],'荆门市':['东宝区','京山县','其它区','掇刀区','沙洋县','钟祥市'],'襄阳市':['保康县','其它区','南漳县','宜城市','枣阳市','樊城区','老河口市','襄城区','襄州区','谷城县'],'鄂州市':['其它区','华容区','梁子湖区','鄂城区'],'随州市':['其它区','广水市','曾都区','随县'],'黄冈市':['其它区','团风县','武穴市','浠水县','红安县','罗田县','英山县','蕲春县','麻城市','黄州区','黄梅县'],'黄石市':['下陆区','其它区','大冶市','西塞山区','铁山区','阳新县','黄石港区']},'湖南省':{'娄底市':['其它区','冷水江市','双峰县','娄星区','新化县','涟源市'],'岳阳市':['临湘市','云溪区','其它区','华容县','君山区','岳阳县','岳阳楼区','平江县','汨罗市','湘阴县'],'常德市':['临澧县','其它区','安乡县','桃源县','武陵区','汉寿县','津市市','澧县','石门县','鼎城区'],'张家界市':['其它区','慈利县','桑植县','武陵源区','永定区'],'怀化市':['中方县','会同县','其它区','新晃侗族自治县','沅陵县','洪江市','溆浦县','芷江侗族自治县','辰溪县','通道侗族自治县','靖州苗族侗族自治县','鹤城区','麻阳苗族自治县'],'株洲市':['其它区','天元区','攸县','株洲县','炎陵县','石峰区','芦淞区','茶陵县','荷塘区','醴陵市'],'永州市':['东安县','其它区','冷水滩区','双牌县','宁远县','新田县','江华瑶族自治县','江永县','祁阳县','蓝山县','道县','零陵区'],'湘潭市':['其它区','岳塘区','湘乡市','湘潭县','雨湖区','韶山市'],'湘西土家族苗族自治州':['保靖县','其它区','凤凰县','古丈县','吉首市','永顺县','泸溪县','花垣县','龙山县'],'益阳市':['其它区','南县','安化县','桃江县','沅江市','资阳区','赫山区'],'衡阳市':['其它区','南岳区','常宁市','珠晖区','石鼓区','祁东县','耒阳市','蒸湘区','衡东县','衡南县','衡山县','衡阳县','雁峰区'],'邵阳市':['其它区','北塔区','双清区','城步苗族自治县','大祥区','新宁县','新邵县','武冈市','洞口县','绥宁县','邵东县','邵阳县','隆回县'],'郴州市':['临武县','其它区','北湖区','嘉禾县','安仁县','宜章县','桂东县','桂阳县','永兴县','汝城县','苏仙区','资兴市'],'长沙市':['其它区','天心区','宁乡县','岳麓区','开福区','望城县','浏阳市','芙蓉区','长沙县','雨花区']},'澳门特别行政区':{'澳门半岛':[],'离岛':[]},'甘肃省':{'临夏回族自治州':['东乡族自治县','临夏县','临夏市','其它区','和政县','广河县','康乐县','永靖县','积石山保安族东乡族撒拉族自治县'],'兰州市':['七里河区','其它区','城关区','安宁区','榆中县','永登县','皋兰县','红古区','西固区'],'嘉峪关市':[],'天水市':['其它区','张家川回族自治县','武山县','清水县','甘谷县','秦安县','秦州区','麦积区'],'定西市':['临洮县','其它区','安定区','岷县','渭源县','漳县','通渭县','陇西县'],'平凉市':['其它区','华亭县','崆峒区','崇信县','庄浪县','泾川县','灵台县','静宁县'],'庆阳市':['其它区','华池县','合水县','宁县','庆城县','正宁县','环县','西峰区','镇原县'],'张掖市':['临泽县','其它区','山丹县','民乐县','甘州区','肃南裕固族自治县','高台县'],'武威市':['其它区','凉州区','古浪县','天祝藏族自治县','民勤县'],'甘南藏族自治州':['临潭县','其它区','卓尼县','合作市','夏河县','玛曲县','碌曲县','舟曲县','迭部县'],'白银市':['会宁县','其它区','平川区','景泰县','白银区','靖远县'],'酒泉市':['其它区','安西县','敦煌市','玉门市','肃北蒙古族自治县','肃州区','金塔县','阿克塞哈萨克族自治县'],'金昌市':['其它区','永昌县','金川区'],'陇南市':['两当县','其它区','宕昌县','康县','徽县','成县','文县','武都区','礼县','西和县']},'福建省':{'三明市':['三元区','其它区','大田县','宁化县','将乐县','尤溪县','建宁县','明溪县','梅列区','永安市','沙县','泰宁县','清流县'],'南平市':['光泽县','其它区','延平区','建瓯市','建阳市','政和县','松溪县','武夷山市','浦城县','邵武市','顺昌县'],'厦门市':['其它区','同安区','思明区','海沧区','湖里区','翔安区','集美区'],'宁德市':['其它区','古田县','周宁县','寿宁县','屏南县','柘荣县','福安市','福鼎市','蕉城区','霞浦县'],'泉州市':['丰泽区','其它区','南安市','安溪县','德化县','惠安县','晋江市','永春县','泉港区','洛江区','石狮市','金门县','鲤城区'],'漳州市':['东山县','云霄县','其它区','华安县','南靖县','平和县','漳浦县','芗城区','诏安县','长泰县','龙文区','龙海市'],'福州市':['仓山区','其它区','台江区','平潭县','晋安区','永泰县','福清市','罗源县','连江县','长乐市','闽侯县','闽清县','马尾区','鼓楼区'],'莆田市':['仙游县','其它区','城厢区','涵江区','秀屿区','荔城区'],'龙岩市':['上杭县','其它区','新罗区','武平县','永定县','漳平市','连城县','长汀县']},'西藏自治区':{'山南地区':['乃东县','其它区','加查县','扎囊县','措美县','曲松县','桑日县','洛扎县','浪卡子县','琼结县','贡嘎县','错那县','隆子县'],'拉萨市':['其它区','城关区','堆龙德庆县','墨竹工卡县','尼木县','当雄县','曲水县','林周县','达孜县'],'日喀则地区':['亚东县','仁布县','仲巴县','其它区','南木林县','吉隆县','定日县','定结县','岗巴县','康马县','拉孜县','日喀则市','昂仁县','江孜县','白朗县','聂拉木县','萨嘎县','萨迦县','谢通门县'],'昌都地区':['丁青县','八宿县','其它区','察雅县','左贡县','昌都县','江达县','洛隆县','类乌齐县','芒康县','贡觉县','边坝县'],'林芝地区':['其它区','墨脱县','察隅县','工布江达县','朗县','林芝县','波密县','米林县'],'那曲地区':['其它区','嘉黎县','安多县','尼玛县','巴青县','比如县','班戈县','申扎县','索县','聂荣县','那曲县'],'阿里地区':['其它区','噶尔县','措勤县','改则县','日土县','普兰县','札达县','革吉县']},'贵州省':{'六盘水市':['六枝特区','其它区','水城县','盘县','钟山区'],'安顺市':['关岭布依族苗族自治县','其它区','平坝县','普定县','紫云苗族布依族自治县','西秀区','镇宁布依族苗族自治县'],'毕节地区':['其它区','大方县','威宁彝族回族苗族自治县','毕节市','纳雍县','织金县','赫章县','金沙县','黔西县'],'贵阳市':['乌当区','云岩区','修文县','其它区','南明区','小河区','开阳县','息烽县','清镇市','白云区','花溪区','金阳开发区'],'遵义市':['习水县','仁怀市','余庆县','其它区','凤冈县','务川仡佬族苗族自治县','桐梓县','正安县','汇川区','湄潭县','红花岗区','绥阳县','赤水市','道真仡佬族苗族自治县','遵义县'],'铜仁地区':['万山特区','其它区','印江土家族苗族自治县','德江县','思南县','松桃苗族自治县','江口县','沿河土家族自治县','玉屏侗族自治县','石阡县','铜仁市'],'黔东南苗族侗族自治州':['三穗县','丹寨县','从江县','其它区','凯里市','剑河县','台江县','天柱县','岑巩县','施秉县','榕江县','锦屏县','镇远县','雷山县','麻江县','黄平县','黎平县'],'黔南布依族苗族自治州':['三都水族自治县','其它区','平塘县','惠水县','独山县','瓮安县','福泉市','罗甸县','荔波县','贵定县','都匀市','长顺县','龙里县'],'黔西南布依族苗族自治州':['兴义市','兴仁县','其它区','册亨县','安龙县','普安县','晴隆县','望谟县','贞丰县']},'辽宁省':{'丹东市':['东港市','元宝区','其它区','凤城市','宽甸满族自治县','振兴区','振安区'],'大连市':['中山区','其它区','岭前区','庄河市','开发区','旅顺口区','普兰店市','沙河口区','瓦房店市','甘井子区','西岗区','金州区','长海县'],'抚顺市':['东洲区','其它区','抚顺县','新宾满族自治县','新抚区','望花区','清原满族自治县','顺城区'],'朝阳市':['其它区','凌源市','北票市','双塔区','喀喇沁左翼蒙古族自治县','建平县','朝阳县','龙城区'],'本溪市':['其它区','南芬区','平山区','明山区','本溪满族自治县','桓仁满族自治县','溪湖区'],'沈阳市':['东陵区','于洪区','其它区','和平区','大东区','康平县','张士开发区','新城子区','新民市','沈北新区','沈河区','法库县','浑南新区','皇姑区','苏家屯区','辽中县','铁西区'],'盘锦市':['兴隆台区','其它区','双台子区','大洼县','盘山县'],'营口市':['其它区','大石桥市','盖州市','站前区','老边区','西市区','鲅鱼圈区'],'葫芦岛市':['兴城市','其它区','南票区','建昌县','绥中县','连山区','龙港区'],'辽阳市':['其它区','太子河区','宏伟区','弓长岭区','文圣区','灯塔市','白塔区','辽阳县'],'铁岭市':['其它区','开原市','昌图县','清河区','西丰县','调兵山市','铁岭县','银州区'],'锦州市':['义县','其它区','凌河区','凌海市','北镇市','古塔区','太和区','黑山县'],'阜新市':['其它区','太平区','彰武县','新邱区','海州区','清河门区','细河区','阜新蒙古族自治县'],'鞍山市':['其它区','千山区','台安县','岫岩满族自治县','海城市','立山区','铁东区','铁西区','高新区']},'重庆':{'重庆市':['万州区','万盛区','丰都县','九龙坡区','云阳县','其它区','北碚区','南岸区','南川区','双桥区','合川区','垫江县','城口县','大渡口区','大足县','奉节县','巫山县','巫溪县','巴南区','开县','彭水苗族土家族自治县','忠县','梁平县','武隆县','永川区','江北区','江津区','沙坪坝区','涪陵区','渝中区','渝北区','潼南县','璧山县','石柱土家族自治县','秀山土家族苗族自治县','綦江县','荣昌县','酉阳土家族苗族自治县','铜梁县','长寿区','黔江区']},'陕西省':{'咸阳市':['三原县','乾县','兴平市','其它区','彬县','旬邑县','杨凌区','武功县','永寿县','泾阳县','淳化县','渭城区','礼泉县','秦都区','长武县'],'商洛市':['丹凤县','其它区','商南县','商州区','山阳县','柞水县','洛南县','镇安县'],'安康市':['其它区','宁陕县','岚皋县','平利县','旬阳县','汉滨区','汉阴县','白河县','石泉县','紫阳县','镇坪县'],'宝鸡市':['其它区','凤县','凤翔县','千阳县','太白县','岐山县','扶风县','渭滨区','眉县','金台区','陇县','陈仓区','麟游县'],'延安市':['其它区','吴起县','子长县','安塞县','宜川县','宝塔区','富县','延川县','延长县','志丹县','洛川县','甘泉县','黄陵县','黄龙县'],'榆林市':['佳县','其它区','吴堡县','子洲县','定边县','府谷县','榆阳区','横山县','清涧县','神木县','米脂县','绥德县','靖边县'],'汉中市':['佛坪县','其它区','勉县','南郑县','城固县','宁强县','汉台区','洋县','留坝县','略阳县','西乡县','镇巴县'],'渭南市':['临渭区','其它区','华县','华阴市','合阳县','大荔县','富平县','潼关县','澄城县','白水县','蒲城县','韩城市'],'西安市':['临潼区','其它区','周至县','户县','新城区','未央区','灞桥区','碑林区','莲湖区','蓝田县','长安区','阎良区','雁塔区','高陵县'],'铜川市':['其它区','印台区','宜君县','王益区','耀州区']},'青海省':{'果洛藏族自治州':['久治县','其它区','玛多县','玛沁县','班玛县','甘德县','达日县'],'海东地区':['乐都县','互助土族自治县','其它区','化隆回族自治县','平安县','循化撒拉族自治县','民和回族土族自治县'],'海北藏族自治州':['其它区','刚察县','海晏县','祁连县','门源回族自治县'],'海南藏族自治州':['共和县','兴海县','其它区','同德县','贵南县','贵德县'],'海西蒙古族藏族自治州':['乌兰县','其它区','天峻县','德令哈市','格尔木市','都兰县'],'玉树藏族自治州':['其它区','囊谦县','曲麻莱县','杂多县','治多县','玉树县','称多县'],'西宁市':['其它区','城东区','城中区','城北区','城西区','大通回族土族自治县','湟中县','湟源县'],'黄南藏族自治州':['其它区','同仁县','尖扎县','河南蒙古族自治县','泽库县']},'香港特别行政区':{'九龙':['九龙城区','油尖旺区','深水埗区','观塘区','黄大仙区'],'新界':['元朗区','北区','大埔区','屯门区','沙田区','离岛区','荃湾区','葵青区','西贡区'],'香港岛':['东区','中西区','南区','湾仔']},'黑龙江省':{'七台河市':['其它区','勃利县','新兴区','桃山区','茄子河区'],'伊春市':['上甘岭区','乌伊岭区','乌马河区','五营区','伊春区','其它区','南岔区','友好区','嘉荫县','带岭区','新青区','汤旺河区','红星区','美溪区','翠峦区','西林区','金山屯区','铁力市'],'佳木斯市':['东风区','其它区','前进区','同江市','向阳区','富锦市','抚远县','桦南县','桦川县','永红区','汤原县','郊区'],'双鸭山市':['其它区','友谊县','四方台区','宝山区','宝清县','尖山区','岭东区','集贤县','饶河县'],'哈尔滨市':['五常市','依兰县','其它区','动力区','南岗区','双城市','呼兰区','宾县','尚志市','巴彦县','平房区','延寿县','方正县','木兰县','松北区','通河县','道外区','道里区','阿城市','香坊区'],'大兴安岭地区':['其它区','加格达奇区','呼玛县','塔河县','漠河县'],'大庆市':['其它区','大同区','杜尔伯特蒙古族自治县','林甸县','红岗区','肇州县','肇源县','萨尔图区','让胡路区','龙凤区'],'牡丹江市':['东宁县','东安区','其它区','宁安市','林口县','海林市','爱民区','穆棱市','绥芬河市','西安区','阳明区'],'绥化市':['兰西县','其它区','北林区','安达市','庆安县','明水县','望奎县','海伦市','绥棱县','肇东市','青冈县'],'鸡西市':['其它区','城子河区','密山市','恒山区','梨树区','滴道区','虎林市','鸡东县','鸡冠区','麻山区'],'鹤岗市':['东山区','兴安区','兴山区','其它区','南山区','向阳区','工农区','绥滨县','萝北县'],'黑河市':['五大连池市','其它区','北安市','嫩江县','孙吴县','爱辉区','逊克县'],'齐齐哈尔市':['依安县','克东县','克山县','其它区','富拉尔基区','富裕县','建华区','拜泉县','昂昂溪区','梅里斯达斡尔族区','泰来县','甘南县','碾子山区','讷河市','铁锋区','龙江县','龙沙区']}};

    var Address = Widget.extend({
    	attrs: {

            // 传入的 triggers
            triggers: {
                value: [],
                getter: function(val) {
                    return $(val);
                }
            },

            defValue: [440000, 440100, 440113],

            province: $('#J-province'),

            city: $('#J-city'),

            district: $('#J-district')

        },

        setup: function() {
        	var that = this;
        	var defValue = this.get('defValue');
        	var province = this.get('province');
        	var city = this.get('city');
        	var district = this.get('district');

        	var initDist = function() {
	            that.setProvince(defValue[0]);
				that.setCity(defValue[0], defValue[1]);
				that.setDistrict(defValue[1], defValue[2]);
			}

			this._getData(initDist);

			setTimeout(function() {
				province.val(defValue[0]).change(function() {
					that.setCity(province.attr('value'));
					that.setDistrict(city.attr('value'));
				})

				city.val(defValue[1]).change(function() {
					that.setDistrict(city.attr('value'));
				})
				
				district.val(defValue[2]);
			}, 200)
        },

        _getData: function(callback) {
        	var self = this;
            var source = '../../statics/js/tpl/address/1.0.0/tdist_py.js',
                sourceName = 'tdist_all';

            $.getScript(source, function(data, textStatus, jqxhr) {
            	areaList = window[sourceName];
            	callback();
            });
        },

        set: function(_province, _city, _district) {
        	this.setProvince(_province);
			this.setCity(_city);
			this.setDistrict(_district);
		},

		setProvince: function(_initProv) {
			var province = this.get('province');

			var tProvince = '';
			for (var id in areaList) {
				if(areaList[id][1] == 1) {
					if(_initProv && _initProv == id) {
						tProvince += '<option value="' + id + '" selected>' + areaList[id][0] + '</option>';
					} else {
						tProvince += '<option value="' + id + '">' + areaList[id][0] + '</option>';
					}
				}
			}
			province.html(tProvince);
		},

		setCity: function(_province, _initCity) {
			var province = this.get('province');
			var city = this.get('city');

			if (!_province) _province = province.attr('value');

			var tCity = '';
			for (var id in areaList) {
				if (areaList[id][1] == _province) {
					if(_initCity && _initCity == id) {
						tCity += '<option value="' + id + '" selected>' + areaList[id][0] + '</option>';
					} else {
						tCity += '<option value="' + id + '">' + areaList[id][0] + '</option>';
					}
				}
			}
			city.html(tCity);
		},

		setDistrict: function(_city, _initDist) {
			var province = this.get('province');
			var city = this.get('city');
			var district = this.get('district');

			if (!_city) _city = city.attr('value');

			var tDistrict = '';
			for (var id in areaList) {
				if (areaList[id][1] == _city) {
					if(_initDist && _initDist == id) {
						tDistrict += '<option value="' + id + '" selected>' + areaList[id][0] + '</option>';
					} else {
						tDistrict += '<option value="' + id + '" >' + areaList[id][0] + '</option>';
					}
				}
			}
			if(!tDistrict) {
				district.hide();
			} else {
				district.show().html(tDistrict);
			}
		},

		clear: function() {
			this.set(defValue[0], defValue[1], defValue[2]);
		}

	});
	
	module.exports = Address;
	
});
